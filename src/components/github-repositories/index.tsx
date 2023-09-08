import { Avatar, List } from 'antd';
import { Repository } from '../../integrations/github/types/repository';

export default function GitHubRepositories({ items }: { items: Repository[] }) {
  return (
    <>
      <List
        dataSource={items}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item key={item.name}>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              description={<>{item.description || item.url}</>}
              title={<a href={item.url}>{item.name}</a>}
            />
          </List.Item>
        )}
      />
    </>
  );
}
