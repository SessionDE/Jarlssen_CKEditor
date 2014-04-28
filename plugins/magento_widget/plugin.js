
CKEDITOR.plugins.add( 'magento_widget', {
    requires: 'widget',
    icons: 'magento_widget',

    init: function( editor ) {

        var doInsert = function(def, values) {
            var element = CKEDITOR.dom.element.createFromHtml(def.template.output(values));
            var wrapper = editor.widgets.wrapElement(element, def.name);
            editor.widgets.initOn( element, def );

            var fragment = new CKEDITOR.dom.documentFragment(wrapper.getDocument());
            fragment.append( wrapper );
            editor.widgets.finalizeCreation( fragment );
        };

        WysiwygWidget.Widget.prototype.updateContent = function(content) {
            var edit = CKEDITOR.instances[this.widgetTargetId];
            var def = edit.widgets.registered.magento_widget;
            // couldn't find an easier access route...
            var select = widgetTools.dialogWindow.content.childNodes[0].children[1].children['widget_options_form'][1];
            doInsert(def, {label:select.options[select.selectedIndex].innerHTML, widget:content});
        }

        editor.widgets.add('magento_widget', {
            button: 'Insert a widget',
            template: '<span class="magentowidget" title="{label}"><span>{widget}</span></span>',
            allowedContent: 'span[title](magentowidget)',

            upcast: function(element) {
                return element.name == 'span' && element.hasClass('magentowidget');
            },

            insert: function() {
                var url = editor.config.mageCfg.widget_window_url;
                widgetTools.openDialog(url + 'widget_target_id/' + editor.name);
            }
        });
    },

} );


