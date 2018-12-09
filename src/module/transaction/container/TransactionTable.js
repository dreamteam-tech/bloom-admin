import React from 'react';
import { Icon, Table, Thead, Th, Tbody, Td, Tr } from 'firefly/component';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { formatMoney } from '../../../utils';

export const TransactionTable = ({ transactions }) => (
  <Table>
    <Thead>
    <Tr>
      <Th>ID</Th>
      <Th>Сумма</Th>
      <Th>Пользователь</Th>
      <Th>Стратегия</Th>
      <Th>Подтверждена</Th>
      <Th>Дата</Th>
    </Tr>
    </Thead>
    <Tbody objects={transactions || []} renderRow={(row, i) => (
      <Tr key={i}>
        <Td>
          <Link to={`/transaction/${row.id}`}>
            {row.id}
          </Link>
        </Td>
        <Td>{formatMoney(row.amount)}</Td>
        <Td>
          {row.user.last_name} {row.user.first_name}
        </Td>
        <Td>
          {row.strategy.name}
        </Td>
        <Td>
          {row.is_confirmed && (
            <Icon icon='Check' />
          )}
        </Td>
        <Td>
          {moment(row.created_at).utc().format('lll')}
        </Td>
      </Tr>
    )}/>
  </Table>
);
