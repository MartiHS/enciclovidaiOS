import React from "react";
import { View, TouchableOpacity, Text, Image, Alert, Linking, TouchableHighlight  } from "react-native";
import { withNavigation } from "react-navigation";

import styles from "./Styles/TabBarStyles";
const tabRoutes=["About", "Media", "Classification", "Map"];
class TabBar extends React.Component {
  
  navigate({route}){
    if(tabRoutes.includes(route)){
      this.props.navigation.navigate(route, {});
    }
  }

  renderTab = ({ route, text }) => {
    const { selected } = this.props;
    
    return (
      <TouchableOpacity style={[styles.tab, selected === route ? styles.selected : null]} onPress={() => this.navigate({route})}>
          <Text style={[
            styles.tabText,
            selected === route ? styles.selected : null
          ]}>{text}</Text>
      </TouchableOpacity>
    );
  };//{selected === route && <View style={styles.tabLine} />}
  
  render() {
    const { shownav } = this.props;
    if(shownav){
      return (
        <View>
            <View style={styles.container}>
                {this.renderTab({ route: "About", text: "Acerca" })}
                {this.renderTab({ route: "Map", text: "Mapa" })}
                {this.renderTab({ route: "Media", text: "Fotos" })}
                {this.renderTab({ route: "Classification", text: "Grupo" })}
            </View>
        </View>
    );
    }
    else{
      return (
        <View>
            <View style={styles.containerButton}>
            <TouchableHighlight style={styles.image} onPress={() => Linking.openURL('https://www.biodiversidad.gob.mx/')}>
              <Image style={styles.image}
                        source={{uri:'ic_footer_bio'}}/>
            </TouchableHighlight >
            <TouchableHighlight style={styles.image} onPress={() => Linking.openURL('https://www.naturalista.mx')}>
              <Image style={styles.image}
                        source={{uri:'ic_footer_natu'}}/>
            </TouchableHighlight >
            </View>
        </View>
    );
    }
  }
}

export default withNavigation(TabBar);
