# Vue Card Game Demo
<img width="800" alt="Start Screen" src="https://user-images.githubusercontent.com/59714584/219283467-4524016f-8df6-461b-b247-844eb07daabd.png">

https://user-images.githubusercontent.com/59714584/219284445-7175a630-e613-4674-9ffa-6ba743cd4985.mov

https://user-images.githubusercontent.com/59714584/219284390-27f8d648-cc77-4048-81f8-06b7b2959c1f.mov

<br></br>

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
