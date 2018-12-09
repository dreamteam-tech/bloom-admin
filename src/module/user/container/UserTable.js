import React from 'react';
import moment from 'moment';
import { Icon, Table, Thead, Th, Tbody, Td, Tr } from 'firefly/component';
import { Link } from 'react-router-dom';

export const UserTable = ({ users }) => (
  <Table>
    <Thead>
    <Tr>
      <Th>ФИО</Th>
      <Th>Телефон</Th>
      <Th>Дата регистрации</Th>
      <Th>Активирован</Th>
      <Th>Администратор</Th>
    </Tr>
    </Thead>
    <Tbody objects={users || []} renderRow={(row, i) => (
      <Tr key={i}>
        <Td>
          <Link to={`/user/${row.id}`}>
            {row.last_name} {row.first_name}
          </Link>
        </Td>
        <Td>
          {row.phone}
        </Td>
        <Td>
          {moment(row.created_at).utc().format('lll')}
        </Td>
        <Td>
          {row.is_active && (
            <Icon icon='Check' />
          )}
        </Td>
        <Td>
          {row.is_admin && (
            <Icon icon='Check' />
          )}
        </Td>
      </Tr>
    )}/>
  </Table>
);
