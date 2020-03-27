/*
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; 

import { I18nManager } from "react-native";

const translationGetters = {
    en: () => require("./locales/en.json"),
    es: () => require("./locales/es.json")
};

// import Translate from "../Config/Translate";


const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };

    const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;

    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
}; 

translate = () => {
    memoize(
        (key, config) => i18n.t(key, config),
        (key, config) => (config ? key + JSON.stringify(config) : key)
    );
}

class Translate {

    constructor(props) {
        setI18nConfig(); // set initial config
    }

    componentDidMount() {
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
    }

    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        setI18nConfig();
        this.forceUpdate();
    };

   
}
*/