## 1、JVM生命周期

```tex
（1）虚拟机启动：
	java虚拟机的启动时通过引导类加载器（bootstrap class loader）创建一个初始类（initial class）来完成的，这个类是由虚拟机的具体实现指定的。
（2）虚拟机执行
	*一个运行中的java虚拟机有着一个清晰的任务：执行java程序
	*程序开始执行时他才运行，程序结束时他就停止。
	*执行一个所谓的java程序的时候，真真正正在执行的时一个叫做java虚拟机的进程。
（3）虚拟机退出
	有如下几种情况：
	*程序正常执行结束
	*程序在执行过程中遇到了异常或错误而异常终止。
	*由于操作系统出现错误而导致java虚拟机进程终止。
	*某线程调用Runtime类或System类的exit方式或Runtime类的halt方法，并且java安全管理器也允许这次退出操作。
	*JNI（java native interface）规范描述了用JNI Invocation API来加载或卸载java虚拟机时，java虚拟机的退出情况。

```

## 2、虚拟机介绍

```tex
（1）Sun Classic vm
	世界上第一款商用的java虚拟机，jdk1.4时完全被淘汰；hotspot内置了此虚拟机。
	虚拟机内部只提供了解释器。
	如果想使用JIT编辑器，就需要进行外挂。一旦使用只能与解释器二选一。
```

