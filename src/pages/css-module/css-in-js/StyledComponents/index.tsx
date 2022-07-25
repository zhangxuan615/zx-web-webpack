import React from "react";
import styled, { ThemeProvider, keyframes } from "styled-components";

/**
 * 1. 一般用法：根据 css样式 生成一个类名，js执行的时候利用动态样式 runtime 注入
 * 2. 样式继承：所谓的继承就是继承动态生成的类名
 * 3. 属性传递、附加属性、动态属性
 *   3.1 一定只会传递原生存在的 dom 属性：如果添加样式的目标是 DOM 元素 (如styled.div), styled-components 会传递 已知 的 HTML 属性给 DOM
 *   3.2 如果是一个自定义的 React 组件 (如styled(MyComponent)), styled-components 会传递全部 props.
 * 4. 伪类、伪元素、嵌套：通过 & 来做伪类、伪元素、嵌套
 * 5. css3动画：使用 keyframes 定义动画
 */
// 1. 一般使用
const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const A1Wrapper = styled.div`
  color: red;
  font-size: 18px;
  &.x {
    color: orange;
  }
`;
const A2Wrapper = styled.div`
  color: red;
  font-size: 18px;
`;
const A3Wrapper = styled.div<{ size: number }>`
  color: red;
  font-size: ${props => props.size}px;
`;
const A4Wrapper = styled.div<{ size: number }>`
  color: ${props => {
    return props.theme.color;
  }};
  font-size: 20px;
`;

// 2. 样式继承
// 生成类名 a
const AWrapper = styled.div`
  color: red;
`;
// 生成类名 a b
const BWrapper = styled(AWrapper)`
  color: blue;
`;

// 3. 属性传递、附加属性
// DOM 元素：只会传递原生的 dom 属性
const StyledDomDiv = styled.div.attrs({
  className: "zx1 zx2",
  attachAttr: "attachAttr"
  // size: 12,
})<{ id: string; size: number; a: number; b: number; c: number }>`
  color: red;
  /* dynamically computed props */
  font-size: ${props => props.size}px;
`;
// React 组件：传递所有属性
const ReactDiv: React.FC<{
  id?: string;
  className?: string;
  a: number;
  b: number;
  c: number;
  attachAttr: string;
  children: React.ReactNode;
}> = ({ className, a, b, c, attachAttr, children }) => (
  <div className={className}>{`${a}-${b}-${c}: ${children} ${attachAttr}`}</div>
);
const StyledReactDiv = styled(ReactDiv).attrs({ attachAttr: "attachAttr" })<{
  size: number;
}>`
  color: blue;
  font-size: ${props => props.size}px;
`;

// 4. 伪类、伪元素、嵌套
const PseudoStyledDiv = styled.div`
  color: red;
  &:hover {
    color: blue;
  }
  &::before {
    content: "🚀";
  }
  &.something {
    font-weight: 800;
  }
`;

// 5. css3动画
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const RotateStyledDiv = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(-90deg, yellow, green);
  animation: ${rotateAnimation} 2s linear infinite;
`;

// 6. 附加属性
/** 附加额外的属性 */
const Input = styled.input.attrs({
  //  static props
  type: "password",
  //  dynamic props
  margin: (props: { size: number }) => props.size || "1em",
  padding: (props: { size: number }) => props.size || "1em"
})`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* dynamically computed props */
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;
const theme = {
  color: "#123456"
};

export default function ComWithStyledComponents() {
  const [cnt, setCnt] = React.useState(1);

  return (
    <div>
      com with styled-components
      <ThemeProvider theme={theme}>
        <A4Wrapper size={cnt}>abc张</A4Wrapper>
      </ThemeProvider>
      <A3Wrapper size={cnt}>abc张</A3Wrapper>
      <div onClick={() => setCnt(cnt + 1)}>{cnt}</div>
      <A1Wrapper>aaa111</A1Wrapper>
      <A2Wrapper>aaa222</A2Wrapper>
      <FlexWrapper>
        <p>样式继承：</p>
        <AWrapper
          style={{
            backgroundColor: "blue"
          }}
        >
          AWrapper
        </AWrapper>
        <BWrapper>BWrapper</BWrapper>
        <BWrapper>BWrapper22</BWrapper>
      </FlexWrapper>
      <FlexWrapper>
        <p>属性传递、附加属性、动态属性：</p>
        <StyledDomDiv id={"123"} a={1} b={2} c={3} size={20}>
          StyledDomDiv11
        </StyledDomDiv>
        <StyledDomDiv id={"123"} a={1} b={2} c={3} size={20}>
          StyledDomDiv11
        </StyledDomDiv>
        <StyledDomDiv id={"123"} a={1} b={2} c={3} size={40}>
          StyledDomDiv
        </StyledDomDiv>
        <StyledReactDiv id={"123"} className={"zx1 zx2"} a={1} b={2} c={3} size={12}>
          StyledReactDiv
        </StyledReactDiv>
      </FlexWrapper>
      <FlexWrapper>
        <p>伪类、伪元素、嵌套：</p>
        <PseudoStyledDiv className="something">PseudoStyledDiv</PseudoStyledDiv>
      </FlexWrapper>
      <FlexWrapper>
        <p>css3动画：</p>
        <RotateStyledDiv />
      </FlexWrapper>
    </div>
  );
}
