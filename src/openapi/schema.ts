/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/accounts": {
    /**
     * アカウントを1件取得する 
     * @description アカウントを1件取得する。アカウントの識別子はAuthorizationに指定したJWT形式のトークンの物が利用される。
     */
    get: operations["getAccounts"];
    /**
     * アカウント登録を行う 
     * @description アカウント登録を行うAPI
     */
    post: operations["postAccounts"];
  };
  "/task-groups": {
    /**
     * タスクグループ一覧を取得する 
     * @description タスクグループ一覧を取得する。
     */
    get: operations["getTaskGroups"];
  };
  "/tasks": {
    /**
     * タスクの記録を開始する 
     * @description タスクの記録を開始するAPI
     */
    post: operations["postTasks"];
  };
  "/tasks/{taskId}/stop": {
    /**
     * タスクの記録を停止する 
     * @description タスクの記録を停止するAPI
     */
    patch: operations["patchTaskStopById"];
    parameters: {
      path: {
        taskId: number;
      };
    };
  };
  "/tasks/{taskId}/complete": {
    /**
     * タスクの記録を終了する 
     * @description タスクの記録を終了するAPI
     */
    patch: operations["patchTaskCompleteById"];
    parameters: {
      path: {
        taskId: number;
      };
    };
  };
  "/tasks/{taskId}/start": {
    /**
     * タスクの記録を再開する 
     * @description 停止状態のタスクの記録を再開するAPI
     */
    patch: operations["patchTaskStartById"];
    parameters: {
      path: {
        taskId: number;
      };
    };
  };
  "/tasks/recording": {
    /**
     * 記録中のタスク一覧を取得する 
     * @description 記録中のタスク一覧を取得する。
     */
    get: operations["getTasksRecording"];
  };
  "/tasks/pending": {
    /**
     * 停止中のタスク一覧を取得する 
     * @description 停止中のタスク一覧を取得する。
     */
    get: operations["getTasksPending"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /**
     * Account 
     * @description アカウント
     */
    Account: {
      /** @description アカウントの識別子 */
      id: number;
      openIdProviders: (components["schemas"]["OpenIdProvider"])[];
    };
    /**
     * OpenIdProvider 
     * @description 登録・ログイン時に利用するOpenIdProvider
     */
    OpenIdProvider: {
      /**
       * @description OpenIdProviderのユーザー識別子 
       * @example 10769150350006150715113082367
       */
      sub: string;
      /** @description OpenIdProviderの種類を表す .e.g. google, line */
      provider: string;
    };
    /**
     * ProblemDetails 
     * @description エラー発生時に返す構造体（RFC7807を参考にしている）
     */
    ProblemDetails: {
      /**
       * @description RFC7807を参照。エラーの種類を表す文字列。 
       * @example UNAUTHENTICATED
       */
      type: string;
      /**
       * @description RFC7807 エラーのタイトル。 
       * @example Account is not authenticated.
       */
      title: string;
      /** @description RFC7807を参照。エラーのsを表す文字列。 */
      detail?: string;
    };
    /**
     * ValidationProblemDetails 
     * @description バリデーションエラーの発生時に返す構造体（RFC7807を参考にしている）
     */
    ValidationProblemDetails: {
      /**
       * @description RFC7807を参照。エラーの種類を表す文字列。 
       * @example UNPROCESSABLE_ENTITY
       */
      type: string;
      /**
       * @description RFC7807 エラーのタイトル。 
       * @example Unprocessable Entity.
       */
      title: string;
      /** @description RFC7807 バリデーションエラーの詳細情報 */
      invalidParams: (components["schemas"]["InvalidParam"])[];
    };
    /**
     * InvalidParam 
     * @description バリデーションエラーの詳細を表す（RFC7807を参考にしている）
     */
    InvalidParam: {
      /** @description バリデーションエラーとなったキー名が格納される */
      name: string;
      /** @description バリデーションエラーが発生した理由が格納される */
      reason: string;
    };
    /**
     * TaskGroup 
     * @description タスクグループ
     */
    TaskGroup: {
      id: number;
      name: string;
      categories: (components["schemas"]["TaskCategory"])[];
    };
    /**
     * TaskCategory 
     * @description タスクカテゴリ
     */
    TaskCategory: {
      id: number;
      name: string;
    };
    /** Task */
    Task: {
      id: number;
      /**
       * @default recording 
       * @enum {string}
       */
      status: "pending" | "completed" | "recording";
      /**
       * Format: date-time 
       * @description タスク開始の開始時刻
       */
      startAt: string;
      /**
       * Format: date-time 
       * @description タスク開始の停止時刻
       */
      endAt: string;
      /** @description タスクの実行時間（秒） */
      duration: number;
      /** @description TaskGroup のID */
      taskGroupId: number;
      /** @description TaskCategory のID */
      taskCategoryId: number;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {

  /**
   * アカウントを1件取得する 
   * @description アカウントを1件取得する。アカウントの識別子はAuthorizationに指定したJWT形式のトークンの物が利用される。
   */
  getAccounts: {
    parameters: {
      header: {
        /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
        "Request-Id"?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["Account"];
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  /**
   * アカウント登録を行う 
   * @description アカウント登録を行うAPI
   */
  postAccounts: {
    parameters: {
      header: {
        /** @description Authorization: Basic の形で送信する */
        Authorization: string;
        /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
        "Request-Id"?: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": components["schemas"]["OpenIdProvider"];
      };
    };
    responses: {
      /** @description Created */
      201: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["Account"];
          "application/xml": Record<string, never>;
        };
      };
      /** @description Bad Request */
      400: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Unprocessable Entity (WebDAV) */
      422: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["ValidationProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  /**
   * タスクグループ一覧を取得する 
   * @description タスクグループ一覧を取得する。
   */
  getTaskGroups: {
    responses: {
      /** @description OK */
      200: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": {
            groups?: (components["schemas"]["TaskGroup"])[];
          };
          "application/xml": Record<string, never>;
          "multipart/form-data": Record<string, never>;
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        headers: {
          /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
          "Request-Id"?: string;
        };
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  /**
   * タスクの記録を開始する 
   * @description タスクの記録を開始するAPI
   */
  postTasks: {
    parameters: {
      header: {
        /** @description Bearer + 半角スペース + JWT形式のトークンで指定する。 */
        Authorization: string;
        /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
        "Request-Id"?: string;
      };
    };
    requestBody?: {
      content: {
        "application/json": {
          taskGroupId: number;
          taskCategoryId: number;
          /**
           * @default recording 
           * @example recording
           */
          status: string;
        };
      };
    };
    responses: {
      /** @description Created */
      201: {
        headers: {
        };
        content: {
          "application/json": components["schemas"]["Task"];
        };
      };
      /** @description Unauthorized */
      401: {
        headers: {
        };
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Unprocessable Entity (WebDAV) */
      422: {
        content: {
          "application/json": components["schemas"]["ValidationProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  /**
   * タスクの記録を停止する 
   * @description タスクの記録を停止するAPI
   */
  patchTaskStopById: {
    parameters: {
      header: {
        /** @description Bearer + 半角スペース + JWT形式のトークンで指定する。 */
        Authorization: string;
        /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
        "Request-Id"?: string;
      };
      path: {
        taskId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Task"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  /**
   * タスクの記録を終了する 
   * @description タスクの記録を終了するAPI
   */
  patchTaskCompleteById: {
    parameters: {
      header: {
        /** @description Bearer + 半角スペース + JWT形式のトークンで指定する。 */
        Authorization: string;
        /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
        "Request-Id"?: string;
      };
      path: {
        taskId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Task"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  /**
   * タスクの記録を再開する 
   * @description 停止状態のタスクの記録を再開するAPI
   */
  patchTaskStartById: {
    parameters: {
      header: {
        /** @description Bearer + 半角スペース + JWT形式のトークンで指定する。 */
        Authorization: string;
        /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
        "Request-Id"?: string;
      };
      path: {
        taskId: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Task"];
        };
      };
      /** @description Bad Request */
      400: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  /**
   * 記録中のタスク一覧を取得する 
   * @description 記録中のタスク一覧を取得する。
   */
  getTasksRecording: {
    parameters: {
      header: {
        /** @description Bearer + 半角スペース + JWT形式のトークンで指定する。 */
        Authorization: string;
        /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
        "Request-Id"?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            tasks?: (components["schemas"]["Task"])[];
          };
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
  /**
   * 停止中のタスク一覧を取得する 
   * @description 停止中のタスク一覧を取得する。
   */
  getTasksPending: {
    parameters: {
      header: {
        /** @description Bearer + 半角スペース + JWT形式のトークンで指定する。 */
        Authorization: string;
        /** @description ユニークなID、リクエスト側からこれを指定した場合はレスポンス時にそのまま返ってくる、指定されない場合はAPI側で生成する */
        "Request-Id"?: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": {
            tasks?: (components["schemas"]["Task"])[];
          };
        };
      };
      /** @description Unauthorized */
      401: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Forbidden */
      403: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          "application/json": components["schemas"]["ProblemDetails"];
        };
      };
    };
  };
}
