import { Table, Thead, Th, Tbody, Td, Tr } from 'firefly/component';
import React from 'react';
import { Link } from 'react-router-dom';

export const StrategyTable = ({ strategies }) => (
  <Table>
    <Thead>
    <Tr>
      <Th>ID</Th>
      <Th>Название</Th>
      <Th>Описание</Th>
      <Th>Процент</Th>
      <Th>Автор</Th>
    </Tr>
    </Thead>
    <Tbody objects={strategies || []} renderRow={(row, i) => (
      <Tr key={i}>
        <Td>
          {row.id}
        </Td>
        <Td>
          <Link to={`/strategy/${row.id}`}>
            {row.name}
          </Link>
        </Td>
        <Td>
          {row.description}
        </Td>
        <Td>
          {row.percent}%
        </Td>
        <Td>
          {row.author ? row.author.phone : '-'}
        </Td>
      </Tr>
    )}/>
  </Table>
);
