import 'whatwg-fetch';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fetchTaskGroups } from '@/api/server/fetch/taskGroup';
import {
  InvalidResponseBodyError,
  UnexpectedFeatureError,
  getBackendApiUrl,
  isTaskGroups,
} from '@/features';
import type { TaskGroup } from '@/features';
import {
  mockInternalServerError,
  mockFetchTaskGroups,
  mockFetchTaskGroupsEmptyResponseBody,
  mockFetchTaskGroupsUnexpectedResponseBody,
} from '@/mocks';

type TestTable = {
  arg: unknown;
  expected: boolean;
};

const mockHandlers = [
  rest.get(getBackendApiUrl('taskGroups'), mockFetchTaskGroups),
];

const mockServer = setupServer(...mockHandlers);

describe('src/api/server/fetch/taskGroup.ts fetchTaskGroups TestCases', () => {
  beforeAll(() => {
    mockServer.listen();
  });

  afterEach(() => {
    mockServer.resetHandlers();
  });

  afterAll(() => {
    mockServer.close();
  });

  const mockAppToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OTk5OSIsInByb3ZpZGVyIjoiZ29vZ2xlIiwiZXhwIjoxNjgzNzMxMzIzLCJqdGkiOiIzNTY3ZGIyNy0zM2RlLTQyMTctOGM5Zi01ODhhYjVkMDdhZGQiLCJpYXQiOjE2ODExMzkzOTZ9.wV-4ftbM7EwPvyzoqWTNKaC1eZko3juJ84Q9C6X_dYs';

  it('should be able to fetch some task groups.', async () => {
    const taskGroups = await fetchTaskGroups({
      appToken: mockAppToken,
    });

    const expected = [
      {
        id: 1,
        name: '仕事',
        categories: [
          {
            id: 1,
            name: '会議',
          },
          {
            id: 2,
            name: '資料作成',
          },
        ],
      },
      {
        id: 2,
        name: '学習',
        categories: [
          {
            id: 3,
            name: 'TOEIC',
          },
        ],
      },
      {
        id: 3,
        name: '趣味',
        categories: [
          {
            id: 4,
            name: '散歩',
          },
          {
            id: 5,
            name: '読書',
          },
        ],
      },
      {
        id: 4,
        name: 'グループ未分類',
        categories: [
          {
            id: 6,
            name: '移動・外出',
          },
        ],
      },
    ];

    expect(taskGroups).toStrictEqual(expected);
  });

  it('should be able to fetch 0 task groups.', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('taskGroups'),
        mockFetchTaskGroupsEmptyResponseBody
      )
    );

    const taskGroups = await fetchTaskGroups({
      appToken: mockAppToken,
    });

    const expected: TaskGroup[] = [];
    expect(taskGroups).toStrictEqual(expected);
  });

  it('should UnexpectedFeatureError Throw, because http status is not ok', async () => {
    mockServer.use(
      rest.get(getBackendApiUrl('taskGroups'), mockInternalServerError)
    );

    const dto = {
      appToken: mockAppToken,
    } as const;

    await expect(fetchTaskGroups(dto)).rejects.toThrow(UnexpectedFeatureError);
  });

  it('should InvalidResponseBodyError Throw, because unexpected response body.', async () => {
    mockServer.use(
      rest.get(
        getBackendApiUrl('taskGroups'),
        mockFetchTaskGroupsUnexpectedResponseBody
      )
    );

    const dto = {
      appToken: mockAppToken,
    } as const;
    await expect(fetchTaskGroups(dto)).rejects.toThrow(
      InvalidResponseBodyError
    );
  });

  it.each`
    arg                                                                                            | expected
    ${[{ id: 1, name: '仕事', categories: [{ id: 1, name: 'テスト' }, { id: 2, name: '設計' }] }]} | ${true}
    ${[{ id: 1, name: '仕事' }]}                                                                   | ${false}
    ${[{ id: 1, name: '仕事', categories: [{}] }]}                                                 | ${false}
    ${[{ id: 1, name: '仕事', categories: [] }]}                                                   | ${false}
    ${[]}                                                                                          | ${true}
  `(
    'should returns $expected when the input is $arg',
    ({ arg, expected }: TestTable) => {
      const values = arg;

      expect(isTaskGroups(values)).toBe(expected);
    }
  );
});
