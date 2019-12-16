import React, { Component } from 'react';
import { Text, View } from 'react-native';

import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize"; 

import {
    I18nManager,
    SafeAreaView,
    ScrollView,
    StyleSheet,
  } from "react-native";

  const translationGetters = {
    en: () => require("../config/locales/en.json"),
    es: () => require("../config/locales/es.json")
  };


  const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
  );

  

  const setI18nConfig = () => {
    // fallback if no available language fits
    const fallback = { languageTag: "en", isRTL: false };
  
    const { languageTag, isRTL } =
      RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
      fallback;
  
    // clear translation cache
    translate.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = { [languageTag]: translationGetters[languageTag]() };
    i18n.locale = languageTag;
  };


export default class HomeScresen extends Component {

    constructor(props) {
        super(props);
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
      
  render() {
    return (
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.value}>{translate("hello")}</Text>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
    safeArea: {
      backgroundColor: "white",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    value: {
      fontSize: 18
    }
  });
