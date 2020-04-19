import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';


interface IProps {
    openForm: () => void; 
}

const NavBar: React.FC<IProps> = ({ openForm }) => {

     return (
         <Menu fixed='top' inverted>
             <Container>
                 <Menu.Item header>
                     <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                     Reactivities 
                 </Menu.Item>
                 <Menu.Item
                     name='Activities'
                 />
                 <Menu.Item>
                     <Button
                         onClick={openForm}
                         positive content='Create Activity'
                     />
                 </Menu.Item>
             </Container>
         </Menu>
     );

};

export default NavBar;