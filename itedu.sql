-- phpMyAdmin SQL Dump
-- version phpStudy 2014
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 05 月 23 日 08:19
-- 服务器版本: 5.5.53
-- PHP 版本: 5.4.45

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `itedu`
--

-- --------------------------------------------------------

--
-- 表的结构 `db_admin`
--

CREATE TABLE IF NOT EXISTS `db_admin` (
  `objectId` int(11) NOT NULL AUTO_INCREMENT COMMENT '口令ID',
  `command` varchar(32) NOT NULL COMMENT '口令',
  PRIMARY KEY (`objectId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- 表的结构 `db_announcement`
--

CREATE TABLE IF NOT EXISTS `db_announcement` (
  `newsId` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `content` varchar(200) NOT NULL COMMENT '公告内容',
  PRIMARY KEY (`newsId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- 表的结构 `db_bbs`
--

CREATE TABLE IF NOT EXISTS `db_bbs` (
  `bbsId` int(11) NOT NULL AUTO_INCREMENT COMMENT '帖子编号',
  `userId` int(11) NOT NULL COMMENT '用户ID',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `content` varchar(5000) NOT NULL COMMENT '内容',
  `createAt` date NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`bbsId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

-- --------------------------------------------------------

--
-- 表的结构 `db_bbscomment`
--

CREATE TABLE IF NOT EXISTS `db_bbscomment` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `objectId` int(11) NOT NULL COMMENT '用户ID',
  `articleId` int(11) NOT NULL COMMENT '文章ID',
  `content` varchar(500) NOT NULL COMMENT '评论内容',
  `createAt` date NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`commentId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

-- --------------------------------------------------------

--
-- 表的结构 `db_blog`
--

CREATE TABLE IF NOT EXISTS `db_blog` (
  `articleId` int(11) NOT NULL AUTO_INCREMENT COMMENT '博文ID',
  `objectId` int(11) NOT NULL COMMENT '用户ID',
  `title` varchar(50) NOT NULL COMMENT '标题',
  `content` varchar(5000) NOT NULL COMMENT '内容',
  `createAt` date NOT NULL COMMENT '创建时间',
  `updateAt` date NOT NULL COMMENT '修改时间',
  PRIMARY KEY (`articleId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- 表的结构 `db_course`
--

CREATE TABLE IF NOT EXISTS `db_course` (
  `courseId` int(11) NOT NULL AUTO_INCREMENT COMMENT '课程ID',
  `name` varchar(30) NOT NULL COMMENT '课程名称',
  `description` varchar(200) NOT NULL COMMENT '课程描述',
  `courseNumber` int(11) NOT NULL COMMENT '学习人数',
  `classifyId` int(11) NOT NULL COMMENT '课程分类ID',
  `authorId` int(10) NOT NULL COMMENT '作者ID',
  `content` varchar(5000) NOT NULL COMMENT '课程资源',
  `createAt` date NOT NULL COMMENT '创建时间',
  `updateAt` date NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`courseId`),
  KEY `courseId` (`courseId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

-- --------------------------------------------------------

--
-- 表的结构 `db_courseclassify`
--

CREATE TABLE IF NOT EXISTS `db_courseclassify` (
  `objectId` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(20) NOT NULL COMMENT '分类名称',
  `createAt` date NOT NULL COMMENT '创建时间',
  `updateAt` date NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`objectId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

-- --------------------------------------------------------

--
-- 表的结构 `db_coursecomment`
--

CREATE TABLE IF NOT EXISTS `db_coursecomment` (
  `commentId` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `objectId` int(11) NOT NULL COMMENT '用户ID',
  `articleId` int(11) NOT NULL COMMENT '文章ID',
  `content` varchar(500) NOT NULL COMMENT '评论内容',
  `createAt` date NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`commentId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

-- --------------------------------------------------------

--
-- 表的结构 `db_user`
--

CREATE TABLE IF NOT EXISTS `db_user` (
  `objectId` int(16) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `authority` int(1) NOT NULL COMMENT '权限',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `email` varchar(30) NOT NULL COMMENT '邮箱',
  `createAt` date NOT NULL,
  `updateAt` date NOT NULL,
  `intro` varchar(200) NOT NULL COMMENT '个人介绍',
  `sex` varchar(1) NOT NULL COMMENT '性别',
  `portrait` varchar(300) NOT NULL COMMENT '头像',
  `nickname` varchar(10) NOT NULL COMMENT '昵称',
  PRIMARY KEY (`objectId`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=17 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
