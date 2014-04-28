
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
                    var url = cfg.browser_window_url + 'target_element_id/' + receiver.id + '/' + 'store/' + cfg.store_id + '/';
                    MediabrowserUtility.openDialog(url, cfg.browser_window_width, cfg.browser_window_height, cfg.browser_window_title, {
                        onBeforeShow: function(win) {
                            win.element.setStyle({zIndex: 300200});
                        }
                    });
                }
            }
        });
    }
});