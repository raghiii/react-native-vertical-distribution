/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder';
import { plusIcon } from './assets/icons';

function placeholder() {
  return (
    <Placeholder>
      <PlaceholderLine
        width={40}
        height={15}
        noMargin={true}
        style={{
          borderRadius: 20,
          backgroundColor: '#E75F5E',
          marginTop: 20,
          marginLeft: 20,
        }}
      />
      <PlaceholderLine
        width={30}
        height={10}
        noMargin={true}
        style={{
          borderRadius: 20,
          backgroundColor: '#E75F5E',
          marginTop: 10,
          marginLeft: 20,
          opacity: 0.5,
        }}
      />
    </Placeholder>
  );
}

function RectPlaceholder() {
  return (
    <View>
      <PlaceholderMedia
        //   size={100}
        color={'#2E4987'}
        style={{
          // opacity: 0.8,
          borderRadius: 20,
          height: '80%',
          width: '100%',
          // backgroundColor: 'red',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 15,
        }}
      >
        <View
          style={{
            width: 140,
            marginLeft: 10,
            flex: 1,
          }}
        >
          <PlaceholderLine
            width={80}
            height={20}
            noMargin={true}
            style={{
              borderRadius: 20,
              backgroundColor: '#6389E4',
            }}
          />
          <PlaceholderLine
            width={50}
            height={10}
            noMargin={true}
            style={{
              borderRadius: 20,
              backgroundColor: '#2E4987',
              marginTop: 10,
              opacity: 0.5,
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#45C8B8',
            height: 40,
            width: 40,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {plusIcon}
        </View>
      </View>
    </View>
  );
}

function thumbnailPlaceholder() {
  return (
    <PlaceholderMedia
      isRound={false}
      // size={70}
      color={'#2E4987'}
      style={{
        // opacity: 0.8,
        borderRadius: 10,
        width: '100%',
        height: '100%',
        // alignSelf: 'stretch',
      }}
    />
  );
}

module.exports = {
  placeholder,
  RectPlaceholder,
  thumbnailPlaceholder,
};
