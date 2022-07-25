import React from "react";
/**
 * this comment tells babel to convert jsx to calls to a function called jsx instead of React.createElement
 *   @emotion/react 的 jsx 是一个增强的 React.createElement 方法，它给 React 元素添加了一个 css prop，
 *   因此其实我们是可以不用导入 React，因为用不到 React.createElement
 *   // /*  \* @\\\\\jsx jsx *\\\\\/
 */
/** @jsx jsx */
import { jsx, css, keyframes } from "@emotion/react";
// @emotion/styled 用法同 styled-components 非常相似
// import styled from '@emotion/styled'

const FlexWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    css={{
      display: "flex",
      alignItems: "center"
    }}
  >
    {children}
  </div>
);

// 样式复用
const cssBase = css`
  background-color: green;
`;

// 1. 一般使用：伪类、伪元素、嵌套
const ObjCssEmotionDiv: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="something"
    css={[
      {
        color: "red",
        "&:hover": {
          color: "blue"
        },

        "&::before": {
          content: '"🚀"'
        },

        "&.something": {
          fontWeight: 800
        }
      },
      cssBase
    ]}
  >
    {children}
  </div>
);
const StrCssEmotionDiv: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    className="something"
    css={[
      css`
        color: blue;
        &:hover {
          color: red;
        }

        &::before {
          content: "🚀";
        }

        &.something {
          font-weight: 800;
        }
      `,
      cssBase
    ]}
  >
    {children}
  </div>
);
// 2. 动画
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const RotateObjAnimationDiv: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div
    css={{
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "linear-gradient(-90deg, yellow, green)",
      animation: `${rotateAnimation} 2s linear infinite`
    }}
  >
    {children}
  </div>
);
const RotateStrAnimationDiv: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div
    css={css`
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: linear-gradient(-90deg, yellow, green);
      animation: ${rotateAnimation} 2s linear infinite;
    `}
  >
    {children}
  </div>
);

const ComWithEmotion = () => {
  return (
    <div>
      com with ComWithEmotion
      <FlexWrapper>
        <p>一般使用：</p>
        <ObjCssEmotionDiv>ObjCssEmotionDiv</ObjCssEmotionDiv>
        <StrCssEmotionDiv>StrCssEmotionDiv</StrCssEmotionDiv>
      </FlexWrapper>
      <FlexWrapper>
        <p>css3动画：</p>
        <RotateObjAnimationDiv />
        <RotateStrAnimationDiv />
      </FlexWrapper>
    </div>
  );
};

export default ComWithEmotion;
