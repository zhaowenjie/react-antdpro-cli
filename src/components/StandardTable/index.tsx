import React, { Component } from 'react';
import { Table } from 'antd';
import { TableProps, ColumnProps } from 'antd/lib/table';
import { TableListItem } from '../../data';

const styles = require('./index.less');

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface StandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: StandardTableColumnProps[];
  data: {
    list: Array<TableListItem>;
    pagination: StandardTableProps<TableListItem>['pagination'];
  };
}

export type StandardTableColumnProps = ColumnProps<TableListItem> & {
  needTotal?: boolean;
  total?: number;
};

function initTotalList(columns: StandardTableColumnProps[]) {
  if (!columns) {
    return [];
  }
  const totalList: StandardTableColumnProps[] = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

interface StandardTableState {
  selectedRowKeys: string[];
  needTotalList: StandardTableColumnProps[];
}

class StandardTable extends Component<StandardTableProps<TableListItem>, StandardTableState> {
  constructor(props: StandardTableProps<TableListItem>) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  render() {
    const { data, rowKey, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    return (
      <div className={styles.standardTable}>
        <Table rowKey={rowKey || 'key'} dataSource={list} pagination={paginationProps} {...rest} />
      </div>
    );
  }
}

export default StandardTable;
