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

## 8、两种bean管理

```tex
① 普通bean，在配置文件中定义的bean就是返回类型

② 工厂bean，在配置文件中定义的类型可与返回类型不一致（bean继承FactoryBean实现方法即可）
```

## 9、bean的生命周期

```tex
① 执行无参构造创建bean实例
② 调用set方法设置属性值
③ 在初始化之前执行的方法（postProcessBeforeInitialization：需要后置处理器）
④ 执行初始化方法（需要手动配置）
⑤ 在初始化之后执行的方法（postProcessAfterInitialization：需要后置处理器）
⑥ 创建bean的实例对象
⑦ 执行销毁方法（需要手动配置）
```

**后置处理器，继承BeanPostProcessor，并实现其中的postProcessBeforeInitialization与postProcessAfterInitialization方法**

## 10、xml自动装配

```tex
根据指定装配规则（属性名称或属性类型），Spring自动将匹配的属性值进行注入
```

```xml
<!-- 使用类型进行装配时(名称使用byName)，comp类型只能配置一次bean-->
<bean id="user" class="com.ltl.User" autowire="byType"></bean>
<bean id="comp" class="com.ltl.Comp"></bean>
```

## 11、属性注入（注解）

```tex
① @Autowired 根据属性类型自动装配

② @Qualifier 根据属性名称进行自动装配

③ @Resource 可根据类型活名称进行自动装填

④ @Value 普通类型的自动状态
```

## 12、什么是AOP

```
面向切面:利用AOP可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各个部分之间的耦合度降低，提高代码的可重用性，同时提高开发效率
```

## 13、AOP底层原理

```tex
使用动态代理实现AOP切面
① 有接口的情况使用JDK动态代理
	创建接口实现类代理对象
② 没有接口的情况使用CGLIB动态代理
	创建类的子类代理对象
```

## 14、JDK动态代理

```tex
使用 JDK 动态代理，使用 Proxy 类里面的方法创建代理对象
	调用newProxyInstance(ClassLoader loader, Class<?>[] interfaction, InvocationHandler h) 方法
	方法有三个参数：
		一、类加载器
		二、增强方法所在的类，这个类实现的接口，支持多个接口
		三、实现这个接口 InvocationHandler，创建代理对象，写增强的部分
```

```java
/**
 * 创建接口，定义方法
 * 
 * @author user
 *
 */
public interface OperationDao {
	public Integer add(Integer a, Integer b);
}
```

```java
/**
 * 创建接口实现类，实现方法
 * 
 * @author user
 *
 */
public class OperationDaoImpl implements OperationDao {
	@Override
	public Integer add(Integer a, Integer b) {
        System.out.println("原方法被执行了----------");
		return a + b;
	}
}
```

```java
/**
 * 创建代理对象
 * 
 * @author user
 *
 */
public class OperationDaoProxy implements InvocationHandler {
	private Object obj;

	/**
	 * 创建有参构造，接口需要被代理的对象
	 * 
	 * @param obj
	 */
	public OperationDaoProxy(Object obj) {
		this.obj = obj;
	}

	/**
	 * 增强方法
	 * 
	 * @param proxy
	 * @param method 方法对象
	 * @param args   方法参数
	 */
	@Override
	public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
		System.out.println("原方法执行前----------");
		// 被增强的原方法
		Object res = method.invoke(obj, args);
		System.out.println("原方法执行后----------");
		return res;
	}
}
```

```java
/**
 * JDK动态路由测试
 * 
 * @author user
 *
 */
public class OperationTest {
	public static void main(String[] args) {
		// 创建接口实现代理类对象
		Class<?>[] interfaces = { OperationDao.class };
		// 创建需要被动态代理的对象
		OperationDaoImpl odi = new OperationDaoImpl();
		// 使用 Proxy 类创建接口代理对象
		OperationDao od = (OperationDao) Proxy.newProxyInstance(OperationTest.class.getClassLoader(), interfaces,
				new OperationDaoProxy(odi));
		System.out.println(od.add(1, 1));
	}
}
```

## 15、AOP术语

1. 连接点：类里面哪些方法可以被增强，则这些方法被称为连接点
2. 切入点：实际被真正增强的方法，则称之为切入点
3. 通知（增强）：实际增强的逻辑部分称之为通知（增强）；
4. 切面：把通知应用到切入点的过程