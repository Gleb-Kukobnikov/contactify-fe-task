import { Checkbox, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

export const ColumnsControl = ({ toggleColumn, columns }) => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="Options"
      icon={<FontAwesomeIcon icon={faListUl} />}
      variant="outline"
    />
    <MenuList color="grey">
      {columns.map((colName) => (
        <MenuItem key={colName} closeOnSelect={false}>
          <Checkbox
            onChange={(e) => toggleColumn({ [colName]: e.target.checked })}
            colorScheme="mainGreen"
            defaultIsChecked
            w="100%">
            {colName}
          </Checkbox>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);
