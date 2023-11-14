import typedFieldsExampleConfig from './examples/typedfields/graphql.config';
import type { IGraphQLConfig, IGraphQLProject } from 'graphql-config';

const gqlConfig: IGraphQLConfig = {
  projects: {
    ...getProjectConfig('examples/typedfields', typedFieldsExampleConfig)
  }
};

export default gqlConfig;

function isGqlProject(project: IGraphQLConfig): project is IGraphQLProject {
  return typeof (project as IGraphQLProject).schema === 'string';
}

function getProjectConfig(projectPath: string, config: IGraphQLConfig) {
  if (!isGqlProject(config)) {
    throw new Error('Invalid project config');
  }

  return {
    [projectPath]: {
      ...config,
      documents: `${projectPath}/${config.documents}`
    }
  };
}
