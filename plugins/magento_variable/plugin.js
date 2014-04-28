
CKEDITOR.plugins.add( 'magento_variable', {
    requires: 'widget',
    icons: 'magento_variable',

    init: function( editor ) {

        var doInsert = function(def, values) {
            var element = CKEDITOR.dom.element.createFromHtml(def.template.output(values));
            var wrapper = editor.widgets.wrapElement(element, def.name);
            editor.widgets.initOn( element, def );

            var fragment = new CKEDITOR.dom.documentFragment(wrapper.getDocument());
            fragment.append( wrapper );
            editor.widgets.finalizeCreation( fragment );
        };

        Variables.insertVariable = function(vars) {
            console.log(MagentovariablePlugin);
            Variables.closeDialogWindow(Variables.dialogWindow);
            console.log(vars);
            doInsert(Variables.textareaElementId, vars);
        };

        Variables.prepareVariableRow = function(varValue, varLabel) {
            var value = (varValue).replace(/"/g, '&quot;').replace(/'/g, '\\&#39;');
            var label = (varLabel).replace(/"/g, '&quot;').replace(/'/g, '\\&#39;');
            var content = '<a href="#" onclick="'+Variables.insertFunction+'({label:\''+ label +'\',value:\''+ value +'\'});return false;">' + varLabel + '</a>';
            return content;
        };

        editor.widgets.add( 'magento_variable', {
            button: 'Insert a variable',
            template: '<span class="magentovariable" title="{label}"><span>{value}</span></span>',
            allowedContent: 'span[title](magentovariable)',

            upcast: function( element ) {
                return element.name == 'span' && element.hasClass('magentovariable');
            },

            insert: function() {
                console.log(editor.config);
                // todo pick by name
                var url = editor.config.mageCfg.plugins[0].options.url;
                MagentovariablePlugin.loadChooser(url, this);
            }

        });
    }

} );


