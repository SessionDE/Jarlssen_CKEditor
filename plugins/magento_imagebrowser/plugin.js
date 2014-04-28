
CKEDITOR.plugins.add('magento_imagebrowser', {
    init: function() {
        CKEDITOR.on('dialogDefinition', function(ev) {
            if(ev.data.name == 'image') {
                var browseButton = ev.data.definition.contents[0].elements[0].children[0].children[1];
                //var browseButton = ev.data.definition.dialog.getButton('browse');
                browseButton.hidden = false;
                browseButton.onClick = function() {

                    var receiver = document.createElement('input');
                    receiver.id = ev.editor.element.name + '__receive_img';
                    Object.defineProperty(receiver, 'value', {
                        set:function(val) {
                            var urlField = ev.data.definition.dialog.getContentElement('info','txtUrl');
                            urlField.setValue(val);
                        }
                    });
                    ev.data.definition.dialog._.element.$.appendChild(receiver);

                    var cfg = ev.editor.config.mageCfg;

                    var typeTitle;
                    var storeId = cfg.store_id !== null ? cfg.store_id : 0;
                    var wUrl = cfg.files_browser_window_url +
                        'target_element_id/' + receiver.id + '/' +
                        'store/' + storeId + '/';

                    if (typeof(cfg.type) != 'undefined' && cfg.type != "") {
                        typeTitle = 'image' == o.type ? Translator.translate('Insert Image...') : this.translate('Insert Media...');
                        wUrl = wUrl + "type/" + o.type + "/";
                    } else {
                        typeTitle = Translator.translate('Insert File...');
                    }

                    MediabrowserUtility.openDialog(wUrl, cfg.files_browser_window_width, cfg.files_browser_window_height, typeTitle, {
                        onBeforeShow: function(win) {
                            win.element.setStyle({zIndex: 300200});
                        }
                    });

                }
            }
        });
    }
});