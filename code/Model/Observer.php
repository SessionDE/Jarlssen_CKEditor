<?php
 /**
 * @author Oliver Giles <oliver.giles@jarlssen.de>
 * @copyright Copyright © 2014, Jarlssen GmbH
 * @license Proprietary. All rights reserved.
 * @date First created 28.04.14
 */

class Jarlssen_CKEditor_Model_Observer
{
    public function addCKEditorHeadJs(Varien_Event_Observer $observer)
    {
        $block = $observer->getEvent()->getBlock();
        if($block instanceof Mage_Page_Block_Html_Head && $block->getCanLoadTinyMce()) {
            $block->addJs('ckeditor/ckeditor.js');
            // save loading the tinymce js
            $block->setCanLoadTinyMce(false);
        }
    }
}