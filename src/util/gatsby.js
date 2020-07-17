import {
  dashcase,
  compareDate,
  compareString,
  compareNumber,
  compareVersion,
  ensureLeadingSlash
} from '../js-utils'

const sortPages = (pages) => pages.sort(
  (
    {
      frontmatter: {
        priority: priority1,
        date: date1,
        version: version1,
        title: title1,
      },
    },
    {
      frontmatter: {
        priority: priority2,
        date: date2,
        version: version2,
        title: title2,
      },
    }
  ) => {
    let comparison = 0
    if (date1) {
      comparison = compareDate(date1, date2)
    } else if (priority1) {
      comparison = compareNumber(priority1, priority2)
    } else if (version1) {
      comparison = compareVersion(version1, version2)
    } else if (title1) {
      comparison = compareString(title2, title1)
    }
    return comparison
  }
)

export const getPaths = (edges) => {
  const data = edges.reduce(
    (
      previousPages,
      {
        node: {
          id,
          frontmatter,
          frontmatter: { title, category, template, version, path },
          body,
          html,
        },
      }
    ) => {
      // eslint-disable-next-line no-param-reassign
      path = path
        || [dashcase(template), dashcase(category), dashcase(title || version)]
          .filter((pathElement) => pathElement && pathElement !== '')
          .join('/')
          
      const {
        [template]: previousTemplatePages = {},
        ...previousOtherPages
      } = previousPages
      const { [category]: previousCategoryPages = [] } = previousTemplatePages

      return {
        ...previousOtherPages,
        [template]: {
          ...previousTemplatePages,
          [category]: [
            ...previousCategoryPages,
            {
              id,
              frontmatter,
              path: ensureLeadingSlash(path),
              body,
              html,
            },
          ],
        },
      }
    },
    {}
  )

  return Object.entries(data).reduce((previousData, [template, categories]) => {
    const reverseSortedCats = Object.entries(categories)
      .sort(([category1], [category2]) => compareString(category2, category1))
      .reduce((previousPages, [category, pages]) => ({
        ...previousPages,
        [category]: sortPages(pages),
      }), {})

    return {
      ...previousData,
      [template]: reverseSortedCats,
    }
  }, {})
}
