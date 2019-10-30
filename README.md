

#DApp 项目制品文档

项目托管于个人[Github](https://github.com/JoshuaQYH/MyTrelloDApp)



## 一、 选题背景及依据

目前做团队日程管理的应用比较多，比较为人所知的当属Trello网页应用（或UWP应用），但是结合区块链技术来做团队日程管理应用几乎没有，所以开发者希望借区块链技术的特点来探索日程管理应用在区块链领域的可能性。

本项目名为  `MyTrello DApp` ， 其设计初衷是希望通过区块链去中心化，不可篡改，分布式的技术特点来实现一个**小型的团队日程管理登记应用**，以任务事件流的方式驱动团队的运作，同时具备针对某一任务进行任务成员互相评分的功能，由此建立一个可信任的工作记录环境。



## 二、技术实现说明

### 技术架构

本项目使用 `solidity`  语言编写两个智能合约  `Team`  和 `Task`  ，使用nodeJs中的 `solc`  编译库进行编译，使用 `web3.js`  进行部署合约和调用，前端界面使用  `React`  UI框架实现，同时使用  `web3.js` ,  `metaMask`和以太坊  `rinkeby `公共测试网络中的合约和公链进行交互, 使用 `react-router` 在多个页面之间进行跳转。

![  ](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231165929.png)



### 环境说明

```
 - windows 10 
 - npm 5.6.0
 - nodejs 8.11.3
 - solidity 0.5.0
 - solc 0.5.0
 - react 16.7.0
 - web3 1.0.0-beta35
 
 其他详见 package.json 文件
```



### 项目文件结构说明

|

|____ `contract`  存放 Team 和 Task `solidity`合约

|____  `compile` 存放Team和Task的编译模块和编译后的 `abi`  `bytecode` 文件

|____  `deploy` 部署测试模块

|____  `public` 存放公共文件

|____ `src` 存放整个项目的主要前端源文件

​	     |____ `component` 存放React组件文件

​	     |____ `contract` 合约的编译后的 `abi` 和 `bytecode` 文件 

​	     |____ `data` 存放 `DApp` 启动时加载的 `Team` 合约地址

 	     |____ `pages` 存放页面的父组件文件，负责组织该页面所需子组件	

​	     |____ `web3call` 存放`web3.js` 合约调用模块

​	     |____ `Routes.js` 页面路由模块

​	     |____ `index.js` 项目入口文件

​             |____ `serviceWorkers` 服务注册模块

|____ `package.json` 包版本管理文件



### 核心部分说明

#### 合约功能

**Team Contract**

一个 `Team Contract` 合约在 一个  `DApp` 中是全局唯一的，负责一个团队的运转记录。主要功能有：

1. 初始化团队信息
2. 添加团队成员
3. 删除团队成员
4. 获取成员信息
5. 添加任务
6. 获取任务

同时提供了权限修饰器来限制一些功能的调用。非 `creator` 无法对合约进行篡改。



**Task Contract** 

一个 `Task Contract` 主要用于管理任务本身信息和参与任务的成员信息，在一个 `DApp` 中是可多次创建的。主要功能有：

1. 初始化任务状态信息
2. 获取任务信息和状态
3. 获取参与任务成员信息
4. 添加任务参与人员
5. 删除任务参与人员
6. 设置任务内部评分
7. 参与人员互相评分

同时提供了权限修饰器来限制账户的功能调用。



#### 编译部分

由于`solidity0.5.0` 版本较新，故编译方式产生了较大的不同。本项目采用预定义 `Json`格式进行编译的方法，从编译后的 `Json` 对象提取了`bytecode` 和 ``abi`字段，并保存到 `json` 文件中。以下是`Task`合约编译过程，`Team`合约类似。

```js
// 获取智能合约的绝对路径
let contractPath = path.resolve('../', 'contracts', 'Task.sol');
// 读取合约内容
let contractSource = fs.readFileSync(contractPath, 'utf-8');
// json 编译源
let jsonContractSource = JSON.stringify({
    language: 'Solidity',
    sources: {
      'Task.sol': {
        content: contractSource,
      },
    },
    settings: {
        outputSelection: {
			'*': {
				'*': [ '*' ]
			}
		}
    },
  });
// 编译并保存结果
let output = JSON.parse(solc.compile(jsonContractSource));  
console.log(output)

taskJson = {
  'abi': {},
  'bytecode': ''
};

// 获取abi bytecode
for (var contractName in output.contracts['Task.sol']) {
    taskJson.abi = output.contracts['Task.sol'][contractName].abi;
    taskJson.bytecode = output.contracts['Task.sol'][contractName].evm.bytecode.object;
}
// 将abi bytecode 保存到json文件中
fs.writeFile('task.json', JSON.stringify(taskJson), function(err){
  if(err)
    console.error(err);
  console.log("task contract compiled sucessfully.")
})
```



#### 部署部分

部署部分是写成一个模块，通过传入 `web3` `account` `abi` `bytecode` `arg` 等参数，使用 `web3.js` 的 `deploy` 接口来部署合约。以下是`Task`合约部署，`Team`部署类似。

```javascript
const deployTask = async(web3, account, abi, bytecode, taskName, endTime, des)=>{
    try{
        console.log("To deploy task contract.")
        var result = await new web3.eth.Contract(abi).deploy(
        {
            data: '0x' + bytecode,   /// 
            arguments: [taskName, endTime, des]  // 智能合约参数
        })
        .send({
            from: account,
            gas: '4700000' 
        });
        console.log("task address: " + result.options.address);
        return result;
    }
    catch(error){
        console.log("task 合约部署失败");
        console.error(error);
        alert("Failed to deploy task contract");
    }
    
};
```



#### 合约调用部分

**获取web3对象**

首选需要获取到web3的对象，此处使用了 `truffle` 框架中构建`truffle-react` 项目中的一个文件`getWeb3.js` ，该文件实现了和 metamask 交互获取 web3对象的功能，如果没有可用的 `metamask `账户,将使用本地网络`web3` 对象。

```javascript
const getWeb3 = () =>
  new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener("load", async () => {
      // Modern dapp browsers...
      
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Acccounts now exposed
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
      }
      // Fallback to localhost; use dev console port by default...
      else {
        // 保证只运行本地环境
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:9545"
        );
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
```

使用上述命令，我们就可以通过命令 ` const web3 = await getWeb3(); `获取得到`web3`对象。这种方法获取`web3` 对象的方法更具有鲁棒性。

 

**调用接口**

合约调用主要涉及`web3.js`三种操作接口：

1. 根据地址实例化合约。

   ` const teamContract = new web3.eth.Contract(Team.abi, teamAddress); `

2. 调用`call` 获取合约内容，不修改合约状态。

   `var teamName = await teamContract.methods.getTeamName().call();`

3. 调用`send`修改合约内容，改变合约状态需要。

   ```javascript
   await taskContract.methods
         .removeMember(memberAddr).send({from: _account, gas: "4700000"})
         .then(function(result){
           console.log(result);
           alert("Remove member sucessfully.")
         })
   ```



#### 前端组件UI

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231204242.png)

`UI` 是通过 `router` 模块实现页面跳转，从而组织各个父组件渲染的。每一个父组件都是一个页面，每一个父组件都有多个子组件，主要工作在于父子组件之间的传值通讯。每个父组件和子组件都维护自身的`state` ，父组件和子组件之间通过`props`来实现通信交互。



## 三、成果展示

* 主界面。主页即任务列表。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231205853.png)



* 显示团队成员界面。页面加载即获取`rinkeby`公链合约数据。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231210142.png)



* 添加任务成员界面。通过输入成员名称，成员账户地址，成员方式即可一键添加成员到`Team` 合约中。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231210529.png)


* 任务评分界面。输入任务地址和参与成员的地址，即可完成评分。一次一分。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231210930.png)



* 确定任务评分模块。通过输入任务地址，点击按钮即可控制任务的评分状态。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231211054.png)



* 任务内容模块。主要记录任务名称，描述，状态，开始时间，预期截止时间，实际截止时间以及成员列表和是否可评分。同时有添加任务成员，删除用户成员，结束任务的按钮。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231211607.png)

  ​

* 添加任务成员。直接输入成员账户地址和成员名称即可即可添加。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231211920.png)

  ​

* 删除用户成员。输入成员地址进行删除。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231212035.png)

  ​

* 结束任务。

  ![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231212134.png)

  ​

  ​

## 四、使用说明

### 项目启动

使用本项目需要以下几个步骤：

```
git clone 
npm install
npm start 
```

然后通过`Chrome` 可以进入`http://localhost:3000` 访问。



### 新建Team

若要创建新的`Team` 合约，则需要通过以下几个步骤，

1. 修改`src/papges/App.js`文件中的合约参数。

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231213330.png)

2. 通过访问`localhost:3000/register`点击按钮部署。


3.复制合约地址，到文件`src/data/teamAddr.json` 中，粘贴替代`address` 字段。重新启动项目即可。

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231213604.png)



> 如果项目出现了数据未能加载的情况，考虑刷新浏览器；出现错误，请打开chrome的console。



## 五、测试样例

### 测试编译情况

编译`task.sol`文件,输出`abi`和`bytecode` 到`task.json`。

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231214738.png)

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231214901.png)

编译`team.sol`文件，输出`abi`和`bytecode` 到`team.json`。



### 测试部署情况

运行项目通过 `localhost:3000/register`部署`Team` 合约。

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231215705.png)



通过[Etherscan](https://rinkeby.etherscan.io/address/0x29C5B98709CaeEa3b588F2Db82989Ab1A0E99874) 访问合约地址`0x29C5B98709CaeEa3b588F2Db82989Ab1A0E99874` ，显示已经部署到公共测试网络。`rinkeby.` 




### 功能测试情况

#### 测试添加任务功能

* 添加任务1

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231214226.png)

获取任务结果.

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231214243.png)

* 添加任务2

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231222152.png)



浏览器访问合约地址，显示部署成功。

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231222230.png)



#### 测试添加成员

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231222305.png)

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231222323.png)



#### 测试删除成员

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231222758.png)

删除成功！

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231223050.png)



#### 添加任务成员

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231224619.png)

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231224111.png)





#### 删除成员

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231224226.png)

![](https://raw.githubusercontent.com/JoshuaQYH/blogImage/master/20181231224659.png)



---

项目部分代码引用链接如下：

>  【1】[UI 界面主要来自 material-UI官网，使用部分组件demo以及高级主题PaperBase](https://material-ui.com/premium-themes/)

>  【2】[获取web3对象的方法来自truffle框架](https://github.com/trufflesuite/truffle)

>  【3】[react 项目构建方法 create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)

同时感谢 `github`，`stackOverflow`，`CSDN` 等开源社区朋友的有用回答。
