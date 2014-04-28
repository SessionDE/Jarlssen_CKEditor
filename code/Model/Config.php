<?php
 /**
 * @author Oliver Giles <oliver.giles@jarlssen.de>
 * @copyright Copyright © 2014, Jarlssen GmbH
 */

class Jarlssen_CKEditor_Model_Config extends Varien_Object
{
    public function getConfig($data = array())
    {
        $config = new Varien_Object();

        $config->setData(array(
            'enabled'                       => true,
            'hidden'                        => false,
            'use_container'                 => false,
            'add_variables'                 => true,
            'add_widgets'                   => true,
            'no_display'                    => false,
            'store_id'                      => Mage::app()->getStore()->getId(),
            'plugins'                       => array()
        ));

        if (Mage::getSingleton('admin/session')->isAllowed('cms/media_gallery')) {
            $config->addData(array(
                'add_images'            => true,
                'browser_window_title'  => Mage::helper('cms')->__("Insert Images..."),
                'browser_window_url'    => Mage::getSingleton('adminhtml/url')->getUrl('*/cms_wysiwyg_images/index'),
                'browser_window_width'  => (int) Mage::getConfig()->getNode('adminhtml/cms/browser/window_width'),
                'browser_window_height' => (int) Mage::getConfig()->getNode('adminhtml/cms/browser/window_height'),
            ));
        }

        if (is_array($data)) {
            $config->addData($data);
        }
        Mage::dispatchEvent('cms_wysiwyg_config_prepare', array('config' => $config));

        return $config;
    }
}