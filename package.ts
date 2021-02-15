import { RequestHandler } from 'express';
import got from 'got';
import { NPMPackage } from './types';

/**
 * Attempts to retrieve package data from the npm registry and return it
 */
export const getPackage: RequestHandler = async function (req, res, next) {
  const { name, version } = req.params;

  try {
    const npmPackage: NPMPackage = await got(
      `https://registry.npmjs.org/${name}`
    ).json();

    const data = {
      name,
      version,
      dependencies: {},
    };

    if (!!version && !!npmPackage.versions[version]) {
      data.dependencies[version] = npmPackage.versions[version].dependencies;
    } else {
      for (let key in npmPackage.versions) {
        const element = npmPackage.versions[key];
        data.dependencies[key] = element.dependencies;
      }
    }
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};
