<?php
 /**
 * @author Oliver Giles <oliver.giles@jarlssen.de>
 * @copyright Copyright © 2014, Jarlssen GmbH
 */

class Jarlssen_CKEditor_Block_Adminhtml_Cms_Page_Edit_Tab_Content extends Mage_Adminhtml_Block_Cms_Page_Edit_Tab_Content
{
    protected function _prepareLayout()
    {
        parent::_prepareLayout();
        if (Mage::getSingleton('cms/wysiwyg_config')->isEnabled()) {
            $this->getLayout()->getBlock('head')->addJs('ckeditor/ckeditor.js');
        }
    }

    protected function _prepareForm()
    {
        parent::_prepareForm();

        /** @var Varien_Data_Form_Element_Fieldset $fieldset */
        $fieldset = $this->getForm()->getElement('content_fieldset');

        $fieldset->removeField('content');

        $fieldset->addType('ckeditor', 'Jarlssen_CKEditor_Varien_Element');
        $contentField = $fieldset->addField('content', 'ckeditor', array(
            'name'      => 'content',
            'style'     => 'height:36em;',
            'required'  => true,
            'disabled'  => !$this->_isAllowedAction('save'),
            'config'    => Mage::getSingleton('jarlssen_ckeditor/config')->getConfig(array('tab_id' => $this->getTabId()))
        ));

        // Setting custom renderer for content field to remove label column
        $contentField->setRenderer($this->getLayout()
            ->createBlock('adminhtml/widget_form_renderer_fieldset_element')
            ->setTemplate('cms/page/edit/form/renderer/content.phtml')
        );

        $this->getForm()->setValues( Mage::registry('cms_page')->getData());

        return $this;
    }
}