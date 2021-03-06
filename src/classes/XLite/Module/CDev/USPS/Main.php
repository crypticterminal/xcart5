<?php
// vim: set ts=4 sw=4 sts=4 et:

/**
 * Copyright (c) 2011-present Qualiteam software Ltd. All rights reserved.
 * See https://www.x-cart.com/license-agreement.html for license details.
 */

namespace XLite\Module\CDev\USPS;

use XLite\Module\CDev\USPS\Model\Shipping\PBAPI\RequestFactory;

/**
 * Main
 */
abstract class Main extends \XLite\Module\AModule
{
    /**
     * Author name
     *
     * @return string
     */
    public static function getAuthorName()
    {
        return 'X-Cart team';
    }

    /**
     * Module name
     *
     * @return string
     */
    public static function getModuleName()
    {
        return 'U.S.P.S.';
    }

    /**
     * Get module major version
     *
     * @return string
     */
    public static function getMajorVersion()
    {
        return '5.3';
    }

    /**
     * Module version
     *
     * @return string
     */
    public static function getMinorVersion()
    {
        return '3';
    }

    /**
     * Get minor core version which is required for the module activation
     *
     * @return string
     */
    public static function getMinorRequiredCoreVersion()
    {
        return '4';
    }

    /**
     * Get module build number (4th number in the version)
     *
     * @return string
     */
    public static function getBuildVersion()
    {
        return '0';
    }

    /**
     * Module description
     *
     * @return string
     */
    public static function getDescription()
    {
        return 'Gets shipping quotes for USPS delivery methods.';
    }

    /**
     * Determines if we need to show settings form link
     *
     * @return boolean
     */
    public static function showSettingsForm()
    {
        return true;
    }

    /**
     * Return link to settings form
     *
     * @return string
     */
    public static function getSettingsForm()
    {
        return \XLite\Core\Converter::buildURL('usps');
    }

    /**
     * Perform some actions at startup
     *
     * @return string
     */
    public static function init()
    {
        parent::init();

        \XLite\Model\Shipping::getInstance()->registerProcessor(
            'XLite\Module\CDev\USPS\Model\Shipping\Processor\USPS'
        );

        \XLite\Model\Shipping::getInstance()->registerProcessor(
            'XLite\Module\CDev\USPS\Model\Shipping\Processor\PB'
        );
    }

    /**
     * The module is defined as the shipping module
     *
     * @return integer|null
     */
    public static function getModuleType()
    {
        return static::MODULE_TYPE_SHIPPING;
    }

    /**
     * Return true if module should work in strict mode
     * (strict mode enables the logging of errors like 'The module is not configured')
     *
     * @return boolean
     */
    public static function isStrictMode()
    {
        return false;
    }

    /**
     * @return RequestFactory
     */
    public static function getRequestFactory()
    {
        return new RequestFactory(
            \XLite\Core\Config::getInstance()->CDev->USPS->pbSandbox
                ? RequestFactory::MODE_SANDBOX
                : RequestFactory::MODE_PRODUCTION
        );
    }

    /**
     * @param mixed $message
     */
    public static function log($message)
    {
        if (\XLite\Core\Config::getInstance()->CDev->USPS->debug_enabled) {
            \XLite\Logger::logCustom('usps', $message);
        }
    }
}
