
CKEDITOR.plugins.add( 'magento_widget', {
    requires: 'widget',
    icons: 'magento_widget',

    init: function( editor ) {
        /**
         * creates an html fragment, substitutes the templated values,
         * and inserts it into the editor
         */
        var doInsert = function(def, values) {
            var element = CKEDITOR.dom.element.createFromHtml(def.template.output(values));
            var wrapper = editor.widgets.wrapElement(element, def.name);
            editor.widgets.initOn( element, def );
            var fragment = new CKEDITOR.dom.documentFragment(wrapper.getDocument());
            fragment.append( wrapper );
            editor.widgets.finalizeCreation( fragment );
        };

        /**
         * Override Magento's callback function that receives the widget
         * content string (e.g. {{widget type="" page=""}})
         */
        WysiwygWidget.Widget.prototype.updateContent = function(content) {
            var edit = CKEDITOR.instances[this.widgetTargetId];
            var def = edit.widgets.registered.magento_widget;
            var select = wWidget.widgetEl; // see mage/adminhtml/wysiwyg/widget.js
            doInsert(def, {label:select.options[select.selectedIndex].innerHTML, widget:content});
        };

        /**
         * Add the Widget plugin
         */
        editor.widgets.add('magento_widget', {
            button: 'Insert a widget',

            template: '<span class="magentowidget" title="{label}"><span>{widget}</span></span>',

            allowedContent: 'span[title](magentowidget)',


            /**
             * Opens magento's widget selection dialog, either for creating
             * a new widget or editing an existing one
             */
            openDialog: function(ajaxOpts) {
                var url = editor.config.mageCfg.widget_window_url + 'widget_target_id/' + editor.name;
                this.dialogWindow = Dialog.info(null, {
                    draggable:true,
                    resizable:false,
                    closable:true,
                    className:'magento',
                    windowClassName:"popup-window",
                    title:Translator.translate('Insert Widget...'),
                    top:50,
                    width:950,
                    //height:450,
                    zIndex:1000,
                    recenterAuto:false,
                    hideEffect:Element.hide,
                    showEffect:Element.show,
                    id:'widget_window',
                    onClose: widgetTools.closeDialog.bind(widgetTools)
                });
                new Ajax.Updater('modal_dialog_message', url, Object.extend({evalScripts: true}, ajaxOpts));
            },

            /**
             * CKEditor handler, called when the widget is to be edited
             */
            edit: function() {
                var type = this.data.type;
                var params = {widget_type: this.data.type, values: this.data};

                this.openDialog({
                    // provide function to update the magento popup with widget data
                    onComplete: function() {
                        new Ajax.Request(wWidget.optionsUrl, {
                            parameters: {
                                widget: Object.toJSON(params)
                            },
                            onSuccess: function(transport) {
                                try {
                                    wWidget.widgetEl.value = type; // the main widget type dropdown
                                    widgetTools.onAjaxSuccess(transport);
                                    var optionsContainerId = wWidget.getOptionsContainerId();
                                    wWidget.switchOptionsContainer();
                                    if ($(optionsContainerId) == undefined)
                                        wWidget.widgetOptionsEl.insert({bottom: widgetTools.getDivHtml(optionsContainerId, transport.responseText)});
                                } catch(e) {
                                    console.log(e);
                                }
                            }.bind(wWidget)
                        });
                    }
                });
            },

            /**
             * Copied from tinyMce widget module. Stores the widget template
             * parameters in the CKEditor widget structure so they can be
             * easily sent back to the server to create the edit dialog
             * @param str
             */
            parseData: function(str) {
                str.gsub(/([a-z0-9\_]+)\s*\=\s*[\"]{1}([^\"]+)[\"]{1}/i, function(match){
                    this.setData(match[1], match[2]);
                }.bind(this));

            },

            /**
             * Called on widget creation. Parse any data from html into
             * object so the editor can be preloaded
             */
            init: function() {
                this.parseData(this.element.$.firstChild.innerHTML);
            },

            upcast: function(element) {
                return element.name == 'span' && element.hasClass('magentowidget');
            },

            /**
             * Insertion callback, open the dialog
             */
            insert: function() {
                this.openDialog();
            },

        });
    }

} );


