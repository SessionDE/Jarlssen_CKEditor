<?php
 /**
 * @author Oliver Giles <oliver.giles@jarlssen.de>
 * @copyright Copyright © 2014, Jarlssen GmbH
 */

class Jarlssen_CKEditor_Varien_Element extends Varien_Data_Form_Element_Textarea
{
    public function getElementHtml()
    {
        $cfg = Zend_Json::encode($this->getConfig());
        
        $html = <<<EOD
<textarea name="{$this->getName()}" title="{$this->getTitle()}" id="{$this->getHtmlId()}" class="textarea {$this->getClass()}" {$this->serialize($this->getHtmlAttributes())}>{$this->getEscapedValue()}</textarea>
<script type="text/javascript">
//<![CDATA[
CKEDITOR.replace('{$this->getHtmlId()}', {
    extraPlugins: 'magento_variable,magento_widget,magento_imagebrowser',
    contentsCss: [CKEDITOR.getUrl('contents.css'), CKEDITOR.getUrl('plugins/magento_variable/style.css'), CKEDITOR.getUrl('plugins/magento_widget/style.css') ],
    mageCfg: $cfg
});
//]]>
</script>
EOD;
        return $html;
    }
}