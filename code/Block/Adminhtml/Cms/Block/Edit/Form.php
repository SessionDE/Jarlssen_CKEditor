<?php
 /**
 * @author Oliver Giles <oliver.giles@jarlssen.de>
 * @copyright Copyright © 2014, Jarlssen GmbH
 */

class Jarlssen_CKEditor_Block_Adminhtml_Cms_Block_Edit_Form extends Mage_Adminhtml_Block_Cms_Block_Edit_Form
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
        $fieldset = $this->getForm()->getElement('base_fieldset');
        $fieldset->removeField('content');

        $fieldset->addType('ckeditor', 'Jarlssen_CKEditor_Varien_Element');
        $fieldset->addField('content', 'ckeditor', array(
            'name'      => 'content',
            'label'     => Mage::helper('cms')->__('Content'),
            'title'     => Mage::helper('cms')->__('Content'),
            'style'     => 'height:36em',
            'required'  => true,
            'config'    => Mage::getSingleton('jarlssen_ckeditor/config')->getConfig()
        ));

        $this->getForm()->setValues(Mage::registry('cms_block')->getData());

        return $this;
    }
}