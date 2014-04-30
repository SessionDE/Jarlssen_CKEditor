<?php
 /**
 * @author Oliver Giles <oliver.giles@jarlssen.de>
 * @copyright Copyright © 2014, Jarlssen GmbH
 */

class Varien_Data_Form_Element_Editor extends Varien_Data_Form_Element_Textarea
{
    public function getElementHtml()
    {
        $config = $this->getConfig();

        $remove = $config->getAddImages() ? '' : "removePlugins: 'image',";

        $extraPlugins = array();
        $css = array("CKEDITOR.getUrl('contents.css')");
        if($config->getAddWidgets()) {
            $extraPlugins[] = 'magento_widget';
            $css[] = "CKEDITOR.getUrl('plugins/magento_widget/style.css')";
        }
        if($config->getAddVariables()) {
            $extraPlugins[] = 'magento_variable';
            $css[] = "CKEDITOR.getUrl('plugins/magento_variable/style.css')";
        }
        if($config->getAddImages())
            $extraPlugins[] = 'magento_imagebrowser';
        $extraPlugins = implode(',', $extraPlugins);
        $css = implode(',', $css);

        $config = Zend_Json::encode($config);

        $html = <<<EOD
<textarea name="{$this->getName()}" title="{$this->getTitle()}" id="{$this->getHtmlId()}" class="textarea {$this->getClass()}" {$this->serialize($this->getHtmlAttributes())}>{$this->getEscapedValue()}</textarea>
<script type="text/javascript">
//<![CDATA[
CKEDITOR.replace('{$this->getHtmlId()}', {
    $remove
    extraPlugins: '$extraPlugins',
    contentsCss: [$css],
    entities: false,
    mageCfg: $config
});
//]]>
</script>
EOD;
        return $html;
    }
}