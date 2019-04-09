import React from 'react';
import NavigationItem from './navigationItem';


const navigation = (props) => {
    const activeStyle = props.activeStyle ? props.activeStyle :  null; 
    const styles = props.styles ? props.styles :  null; 
    const items = props.items.map((item,index) => {
        return <NavigationItem 
                key={index} 
                type={item.type} 
                url={item.url}
                styles={styles}
                activeStyle = { activeStyle}
                >
                    {item.label}
                </NavigationItem >
    }); 
    let listClassname = new Array('unstyledList');
    if(props.type === 'horizontal'){
        listClassname.push('flex' , 'flex-fixed');
    }
   // console.log('listClassname' , listClassname);
    const classString = listClassname.join(' ');
    return (
        <ul className={classString}>
            {items}
        </ul>
    )
}
export default navigation;

