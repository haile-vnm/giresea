import { Card, Col, Empty, Row } from 'antd';
import { Repository } from '../../integrations/github/types/repository';
import If from '../if';
import styled from 'styled-components';

const EmptyPageWrapper = styled.div`
  width: 100%;
  justify-content: center;
`;

const CardWrapper = styled.div`
  padding: .75rem;
`;

export default function GitHubRepositories({ items }: { items: Repository[] }) {
  return (
    <Row>
      <If condition={items.length} else={<EmptyPageWrapper><Empty></Empty></EmptyPageWrapper>}>
        {items.map(item => (
          <Col data-testid={item.url} key={item.url} lg={8} sm={12} xl={6} xs={24}>
            <CardWrapper>
              <Card>
                <Card.Meta
                  description={`🌟 ${item.stargazerCount || 0} - 🍴 ${item.forkCount || 0}`}
                  title={<a href={item.url}>{item.name}</a>}
                />
              </Card>
            </CardWrapper>
          </Col>
        ))}
      </If>
    </Row>
  );
}
