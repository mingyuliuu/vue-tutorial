# Vue Card Game Demo



# Vue Study Notes

## **Styled-components** in Vue.js:
(https://blog.logrocket.com/theming-vue-js-with-styled-components/)  
`npm i vue-styled-components` to install.  


### **Dynamic styling with props**  
```
const styledCompProps = { sampleProp: Boolean };

export const StyledComp = styled("h1", styledCompProps)`
  color: ${(props) => (props.sampleProp ? "white" : "red")};
`;
```

### **Applying the same style to multiple components**
```
export const StyledComp2 = StyledComp.withComponent("h2");
```

### **Extending styles**
```
export const StyledComp3 = StyledComp.extend`
  color: purple;
  border-color: purple;
`;
```