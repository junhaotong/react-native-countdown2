# react-native-countdown2
```
Rreact Native 倒计时组件
```

### Getting started
#### 1.安装
##### npm
```
$ npm i react-native-countdown2 --save
```
##### yarn
```
$ yarn add react-native-countdown2
```
#### 2.导入
```
import CountDown from 'react-native-countdown2';
```

#### Properties  
|    Prop       |      Default   |  Type        |  Description             |
|:-----------------:|:--------------:|:-----------------:|:------------------------------:|
|    time          |        null       |  Number      |  倒计时结束时间戳         |
|    endTitle        |       已结束       |  String      |  倒计时结束后显示的文字      |
|    endFunc    |      null      |  Function    |  倒计时结束回调 |
|  renderCountDown   |  null             |  Function       |   自定义倒计时，接收一个参数可以获取倒计时  |


#### Example
```
<CountDown
   endFunc={() => console.log(item.name)}
   style={styles.countDown}
   endTitle="结束一波"
   renderCountDown="(date) => <Text>{date.days}:{date.hours}:{date.minutes}:{date.seconds}</Text>"
   time={this.state.time}/>
```
