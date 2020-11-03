# spring5知识点合集

## 1、 Srping5 核心包

<img src="image-20201030124241567.png" alt="image-20201030124241567" style="zoom: 200%;" />

## 		2、什么是IOC

```tex
① 控制反转，把对象创建于对象之间的调用过程交给spring进行管理

② 使用IOC的目的是为了降低耦合度
```

## 		3、 IOC底层原理

```tex
Xml解析、工厂模式、反射

IOC的思想基于IOC容器实现，IOC容器底层就是对象工厂
```

```xml
<!-- 第一步xml配置文件，配置创建的对象 -->
<bean id="user" class="com.ltl.User"></bean>
```

```java
//第二步有service于dao类，创建工厂类
public class UserFactory{
    public static UserDao getDao(){
        String classValue = "class属性值"; //xml解析获取class值
        Class clazz = Class.forName(classValue); //通过反射创建对象
        return (UserDao)clazz.newInstance(); 
    }
}
```

## 		4、IOC接口
```tex
Spring 提供 IOC 容器实现两种方式：（两个接口）

① BeanFactory：IOC 容器基本实现，是 Spring 内部的使用接口，不提供开发人员进行使用
* 加载配置文件时候不会创建对象，在获取对象（使用）才去创建对象

② ApplicationContext：BeanFactory 接口的子接口，提供更多更强大的功能，一般由开发人 员进行使用
* 加载配置文件时候就会把在配置文件对象进行创建
```

## 	5、IOC于DI的区别

```tex
IOC：控制反转，把对象创建与对象之间的调用过程交给Spring进行管理

DI：依赖注入，指在创建对象的过程中，将对象依赖的属性通过配置进行注入；DI的实现依赖于IOC，先有控制反转才有依赖注入
```

## 	6、什么是Bean管理

```
① Srping 创建对象
② Spring 注入属性
```

## 	7、Bean标签中id于name属性的区别

```tex
① id属性必须满足xml命名规范；
* 不能以特殊字符数字开头，不能包含空格等；
* 配置文件中不予许出现相同的id属性标签，否则启动会报错

② name属性可以使用任何字符
* 当配置多个相同name时，会被相互覆盖，不建议使用name属性
* name可以给当前标签起多个别名，使用头号分割如：name=”a,b,c”

③ 当id与name都未被指定是，以类全名当做name使用
```

## 8、xml自动装配

```tex
根据指定装配规则（属性名称或属性类型），Spring自动将匹配的属性值进行注入
```

```xml
<!-- 使用类型进行装配时(名称使用byName)，comp类型只能配置一次bean-->
<bean id="user" class="com.ltl.User" autowire="byType"></bean>
<bean id="comp" class="com.ltl.Comp"></bean>
```

