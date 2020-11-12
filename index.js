import React from 'react';
import {
  Text,
  View,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Easing,
} from 'react-native';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import {
  placeholder,
  RectPlaceholder,
  thumbnailPlaceholder,
} from './placeholder';
import {
  userIcon,
  searchIcon,
  backIcon,
  filterIcon,
  cartIcon,
  falseIcon,
  crossIcon,
} from './assets/icons';

export default class DoubleMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerWidth: new Animated.Value(0),
      displayLeftPane: false,
      displayRightPane: true,
      slideProgress: new Animated.Value(0),
      itemsProgress: new Animated.Value(0),
      secondPaneWidth: new Animated.Value(0),
      thirdPaneWidth: new Animated.Value(0),
      thumbnailHeight: new Animated.Value(0),
      showBackButton: false,
      isCartOpen: false,
      circleSize: new Animated.Value(0),
      selectedFirstCategory: null,
      selectedSecondCategory: null,
      mainCategoryWidth: new Animated.Value(0),
      cartItems: [],
      indexToAnimate: null,
      overlayCoordinates: { locationX: 130, locationY: 100 },
    };
    this.moveAnimation = new Animated.ValueXY({ x: 130, y: 100 });
    this.overlaySize = new Animated.Value(0);
    this.overlayOpacity = new Animated.Value(0);

    this._onmove = (evt, item) => {
      this.moveAnimation.setValue({
        x: 130,
        y: 100 + item.index * 180,
      });
      Animated.spring(this.moveAnimation, {
        toValue: !this.state.isCartOpen
          ? {
              x: 340,
              y:
                95 +
                this.state.cartItems.length * 70 +
                this.state.cartItems.length * 45,
            }
          : {
              x: Dimensions.get('window').width / 2 + 20,
              y: 95,
            },
        useNativeDriver: false,
      }).start();
      Animated.spring(this.overlaySize, {
        toValue: !this.state.isCartOpen ? 1 : 2,
        useNativeDriver: false,
      }).start(() => {
        this.overlaySize.setValue(0);
      });
      Animated.spring(this.overlayOpacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start(() => {
        this.overlayOpacity.setValue(0);
      });
    };
  }

  render() {
    const fullWidth = Dimensions.get('window').width;
    const fiftyPercentWidth = Dimensions.get('window').width / 2;

    const anim = this.state.drawerWidth.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [fullWidth - 60, 80, 0],
    });

    const anim2 = this.state.secondPaneWidth.interpolate({
      inputRange: [0, 0.5, 1, 2],
      outputRange: [30, 240, 310, fiftyPercentWidth],
    });

    const anim3 = this.state.thirdPaneWidth.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [40, fiftyPercentWidth, 100],
    });

    const animateHeight = this.state.thumbnailHeight.interpolate({
      inputRange: [0, 1],
      outputRange: [70, 140],
    });

    const animateCircleSize = this.state.circleSize.interpolate({
      inputRange: [0, 1],
      outputRange: [80, 50],
    });

    const animateWidth = this.state.mainCategoryWidth.interpolate({
      inputRange: [0, 1],
      outputRange: [250, 180],
    });

    const overlaySize = this.overlaySize.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [200, 60, 130],
    });

    const overlayOpacity = this.overlayOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 10],
    });

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={[
              {
                backgroundColor: '#2E4987',
                height: overlaySize,
                width: overlaySize,
                position: 'absolute',
                zIndex: overlayOpacity,
              },
              this.moveAnimation.getLayout(),
            ]}
          />
          <Animated.View
            style={{
              width: anim,
              backgroundColor: '#F68E5E',
              shadowColor: '#000',
              shadowOpacity: 0.4,
              shadowRadius: 6,
              shadowOffset: {
                width: 10,
                height: 0,
              },
              zIndex: 2,
            }}
          >
            <View
              style={{
                backgroundColor: '#E75F5E',
                height: 60,
                justifyContent: 'center',
              }}
            >
              {!this.state.showBackButton ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                  }}
                >
                  <View>{userIcon}</View>
                  <View>
                    <Text
                      style={{
                        color: '#F9BCA7',
                        fontWeight: '600',
                        fontSize: 20,
                      }}
                    >
                      CATEGORIES
                    </Text>
                  </View>
                  <View>{searchIcon}</View>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={(item) => {
                    this.setState({
                      showBackButton: false,
                    });
                    Animated.parallel([
                      Animated.spring(this.state.drawerWidth, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.quad,
                        useNativeDriver: false,
                      }),
                      Animated.spring(this.state.secondPaneWidth, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.quad,
                        useNativeDriver: false,
                      }),
                      Animated.spring(this.state.circleSize, {
                        toValue: 0,
                        duration: 150,
                        easing: Easing.quad,
                        useNativeDriver: false,
                      }),
                      Animated.spring(this.state.mainCategoryWidth, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.quad,
                        useNativeDriver: false,
                      }),
                    ]).start(() => {});
                  }}
                  style={{
                    alignItems: 'center',
                  }}
                >
                  {backIcon}
                </TouchableOpacity>
              )}
            </View>
            <FlatList
              data={this.props.firstMenu}
              renderItem={(item, index) => (
                <TouchableOpacity
                  style={{
                    paddingLeft: this.state.showBackButton ? 15 : 30,
                    paddingVertical: this.state.showBackButton ? 15 : 25,
                    flexDirection: 'row',
                    backgroundColor:
                      item.index ===
                      get(this.state.selectedFirstCategory, 'index')
                        ? '#F6B972'
                        : null,
                  }}
                  onPress={() => {
                    this.setState({
                      showBackButton: true,
                      selectedFirstCategory: item,
                    });
                    Animated.parallel([
                      Animated.spring(this.state.circleSize, {
                        toValue: 1,
                        duration: 150,
                        easing: Easing.quad,
                        useNativeDriver: false,
                      }),
                      Animated.spring(this.state.drawerWidth, {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.quad,
                        useNativeDriver: false,
                      }),
                      Animated.spring(this.state.secondPaneWidth, {
                        toValue: 1,
                        duration: 300,
                        easing: Easing.quad,
                        useNativeDriver: false,
                      }),
                      Animated.spring(this.state.mainCategoryWidth, {
                        toValue: 0,
                        duration: 200,
                        easing: Easing.quad,
                        useNativeDriver: false,
                      }),
                    ]).start(() => {});
                    this.flatListRef.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                  }}
                >
                  <Animated.View
                    style={{
                      backgroundColor: '#E75F5E',
                      height: animateCircleSize,
                      width: animateCircleSize,
                      borderRadius: 50,
                    }}
                  />
                  {placeholder(this.state.showBackButton)}
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </Animated.View>
          <Animated.View
            style={{
              width: anim2,
              backgroundColor: '#496FC6',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.4,
              shadowRadius: 6,
              shadowOffset: {
                width: 10,
                height: 0,
              },
              zIndex: 1,
            }}
          >
            <View
              style={{
                backgroundColor: '#3961AF',
                height: 60,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}
              >
                <View>
                  <Text
                    style={{
                      color: '#638CE7',
                      fontWeight: '600',
                      fontSize: 20,
                    }}
                  >
                    CATEGORY
                  </Text>
                </View>
                <View>{filterIcon}</View>
              </View>
            </View>
            <FlatList
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              data={this.props.secondMenu}
              renderItem={(item, index) => (
                <Animated.View
                  style={{
                    marginTop: 20,
                    paddingVertical: 20,
                  }}
                >
                  <TouchableOpacity
                    ref={(ref) => {
                      this.overlayRef = ref;
                    }}
                    onPress={(evt) => {
                      if (!this.state.cartItems.includes(item.item)) {
                        this._onmove(evt, item);
                        this.setState({
                          cartItems: [...this.state.cartItems, item.item],
                          indexToAnimate: item.index,
                        });
                      }
                      Animated.parallel([
                        Animated.spring(this.state.mainCategoryWidth, {
                          toValue: 1,
                          duration: 200,
                          easing: Easing.quad,
                          useNativeDriver: false,
                        }),
                        !this.state.isCartOpen &&
                          Animated.timing(this.state.secondPaneWidth, {
                            toValue: 0.5,
                            duration: 200,
                            easing: Easing.quad,
                            useNativeDriver: false,
                          }),
                        !this.state.isCartOpen &&
                          Animated.timing(this.state.thirdPaneWidth, {
                            toValue: 2,
                            duration: 200,
                            easing: Easing.quad,
                            useNativeDriver: false,
                          }),
                      ]).start(() => {});
                    }}
                  >
                    <Animated.View
                      style={{
                        height: animateWidth,
                        width: animateWidth,
                      }}
                    >
                      {RectPlaceholder()}
                    </Animated.View>
                  </TouchableOpacity>
                </Animated.View>
              )}
              keyExtractor={(item) => item.id}
            />
          </Animated.View>
          <Animated.View
            style={{
              width: anim3,
              backgroundColor: '#24375A',
            }}
          >
            <View
              style={{
                backgroundColor: '#182942',
                height: 60,
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                }}
              >
                {!this.state.isCartOpen ? (
                  <View>{cartIcon}</View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Text
                      style={{
                        color: '#638CE7',
                        fontWeight: '600',
                        fontSize: 20,
                      }}
                    >
                      {this.state.cartItems.length} ITEM(S)
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ isCartOpen: false });
                        Animated.parallel([
                          Animated.timing(this.state.drawerWidth, {
                            toValue: 1,
                            duration: 250,
                            easing: Easing.ease,
                            useNativeDriver: false,
                          }),
                          Animated.spring(this.state.secondPaneWidth, {
                            toValue: 1,
                            duration: 250,
                            easing: Easing.ease,
                            useNativeDriver: false,
                          }),
                          Animated.spring(this.state.thumbnailHeight, {
                            toValue: 0,
                            duration: 250,
                            easing: Easing.ease,
                            useNativeDriver: false,
                          }),
                          Animated.spring(this.state.mainCategoryWidth, {
                            toValue: 0,
                            duration: 200,
                            easing: Easing.quad,
                            useNativeDriver: false,
                          }),
                        ]).start(() => {});
                      }}
                    >
                      {falseIcon}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            {this.state.cartItems.length > 0 ? (
              <FlatList
                inverted={this.state.isCartOpen ? true : false}
                ref={(ref) => {
                  this.cartFlatList = ref;
                }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: this.state.isCartOpen
                    ? 'flex-end'
                    : 'flex-start',
                }}
                onContentSizeChange={() => {
                  this.cartFlatList.scrollToEnd({ animated: true });
                }}
                data={this.state.cartItems}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={{
                      marginTop: 15,
                      padding: 15,
                    }}
                    onPress={() => {
                      this.setState({ isCartOpen: true });
                      Animated.parallel([
                        Animated.timing(this.state.drawerWidth, {
                          toValue: 2,
                          duration: 250,
                          easing: Easing.ease,
                          useNativeDriver: false,
                        }),
                        Animated.timing(this.state.secondPaneWidth, {
                          toValue: 2,
                          duration: 250,
                          easing: Easing.ease,
                          useNativeDriver: false,
                        }),
                        Animated.timing(this.state.thirdPaneWidth, {
                          toValue: 1,
                          duration: 250,
                          easing: Easing.ease,
                          useNativeDriver: false,
                        }),
                        Animated.spring(this.state.thumbnailHeight, {
                          toValue: 1,
                          duration: 250,
                          easing: Easing.ease,
                          useNativeDriver: false,
                        }),
                      ]).start(() => {});
                    }}
                  >
                    <Animated.View style={{ height: animateHeight }}>
                      {this.state.isCartOpen && (
                        <TouchableOpacity
                          style={{
                            backgroundColor: 'coral',
                            top: -10,
                            right: -10,
                            position: 'absolute',
                            borderRadius: 50,
                            zIndex: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => {
                            this.setState({
                              cartItems: this.state.cartItems.filter(
                                (data) => data.index !== index
                              ),
                            });
                          }}
                        >
                          {crossIcon}
                        </TouchableOpacity>
                      )}
                      {thumbnailPlaceholder()}
                    </Animated.View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={{
                  width: 200,
                  position: 'absolute',
                  top: 400,
                  right: -80,
                  zIndex: 1000,
                  transform: [{ rotate: '-90deg' }],
                }}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: '200',
                    fontSize: 16,
                    textAlign: 'center',
                    opacity: 0.7,
                  }}
                >
                  C A R T{'  '} I S {'  '} E M P T Y
                </Text>
              </View>
            )}
          </Animated.View>
        </View>
      </SafeAreaView>
    );
  }
}

DoubleMenu.propTypes = {
  firstMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
  secondMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
};
