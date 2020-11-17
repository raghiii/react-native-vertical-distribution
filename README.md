# react-native-vertical-distribution

## A simple UI component/animation for double menu distribution in react native.

### It's so simple to use. You just need to pass the data (categories) for both of the columns/double menu

_& it will render the same animation as below_ :smile:

![](vertical-distribution.gif)

## Usage:

```
npm i react-native-vertical-distribution
```

Just import the **DoubleMenu** component from **'react-native-vertical-distribution'** in your file:

```
import DoubleMenu from 'react-native-vertical-distribution';
```

And call it like this:

```
<DoubleMenu firstMenu={DATA1} secondMenu={DATA2} />
```

where, **DATA1** & **DATA2** are two array of objects for first and second **menu/column** respectively.
