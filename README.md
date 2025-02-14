# Maker社团管理系统后端

## 项目简介
这是一个基于 Express + TypeScript + MySQL 开发的Maker社团管理系统后端，提供用户管理、项目管理、活动管理等功能的 RESTful API 接口。

## 技术栈
- Node.js + Express
- TypeScript
- MySQL
- JWT认证
- RESTful API

## 快速开始

### 环境要求
- Node.js >= 14
- MySQL >= 8.0
- TypeScript >= 4.5

### 安装步骤
1. 克隆项目
```bash
git clone <[repository-url](https://github.com/assumeengagetry/makerhub-backend.git)>
cd user-management-system/backend
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，填写数据库等配置信息
```

4. 启动项目
```bash
# 开发环境
npm run dev

# 生产环境
npm run build
npm start
```

## 项目结构
```
backend/
├── src/
│   ├── config/         # 配置文件
│   ├── controllers/    # 控制器
│   ├── middleware/     # 中间件
│   ├── models/         # 数据模型
│   ├── routes/         # 路由定义
│   ├── types/          # 类型定义
│   ├── utils/          # 工具函数
│   └── app.ts          # 应用入口
├── .env                # 环境变量
├── .env.example        # 环境变量示例
├── tsconfig.json       # TypeScript配置
└── package.json        # 项目依赖
```

## API接口说明

### 用户相关
| 方法   | 路径                | 描述         | 权限     |
|--------|-------------------|------------|----------|
| POST   | /api/auth/login  | 用户登录     | -        |
| POST   | /api/auth/register| 用户注册    | -        |
| GET    | /api/users       | 获取用户列表  | 会长     |
| GET    | /api/users/:id   | 获取用户详情  | 登录用户  |

### 项目相关
| 方法   | 路径                | 描述         | 权限     |
|--------|-------------------|------------|----------|
| GET    | /api/projects    | 获取项目列表  | 登录用户  |
| GET    | /api/projects/:id| 获取项目详情  | 登录用户  |
| POST   | /api/projects    | 创建新项目    | 部长     |

### 活动相关
| 方法   | 路径                | 描述         | 权限     |
|--------|-------------------|------------|----------|
| GET    | /api/events      | 获取活动列表  | 登录用户  |
| GET    | /api/events/:id  | 获取活动详情  | 登录用户  |

## 权限说明

系统采用基于角色的访问控制（RBAC），定义了以下角色：
- 超级管理员 (CHAOJIHUIZHANG)
- 管理员 (HUIZHANG)
- 部长 (BUZHANG)
- 普通成员 (HUIYUAN)

## 开发说明

### 添加新接口
1. 在 `src/types` 中定义数据类型
2. 在 `src/models` 中添加数据库操作
3. 在 `src/controllers` 中实现业务逻辑
4. 在 `src/routes` 中注册路由

### 单元测试
```bash
npm run test
```

### 代码检查
```bash
npm run lint
```

## 部署说明

### 生产环境部署
1. 构建项目
```bash
npm run build
```

2. 配置环境变量
确保生产环境的 `.env` 文件配置正确

3. 启动服务
```bash
npm start
```

### 使用 PM2 部署
```bash
pm2 start dist/app.js --name "maker-system"
```

## 常见问题

### 数据库连接失败
- 检查 `.env` 中的数据库配置
- 确保 MySQL 服务正在运行
- 检查防火墙设置

### JWT 验证失败
- 检查 `.env` 中的 JWT_SECRET 配置
- 确保 token 格式正确（Bearer token）

## 贡献指南
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证
MIT License

## 联系方式
- 项目负责人：Clint
- 邮箱：1255829396@qq.com

### 这是后端的API接口文档

---

## 1. 基本信息

```json
{"openapi":"3.0.2","info":{"title":"Maker社团管理系统","version":"0.1.0"} ... }
```

- **openapi**：标识使用的是 OpenAPI 规范 3.0.2 版本。  
- **info**：文档的基本信息  
  - **title**：文档标题为“Maker社团管理系统”，说明这是一个用于社团管理的系统 API 文档。  
  - **version**：版本号为 0.1.0，表示目前该 API 的版本。

---

## 2. 路径（Paths）

文档中定义了多个 API 路径，每个路径对应一个接口操作。下面简单说明几个主要接口：

### 2.1 根路径 `/`

```json
"/": {
  "get": {
    "summary": "Home",
    "operationId": "home__get",
    "responses": {
      "200": {
        "description": "Successful Response",
        "content": {"application/json": {"schema": {}}}
      }
    }
  }
}
```

- **方法**：GET  
- **功能**：请求根路径时返回主页信息（摘要中写的是 "Home"）。  
- **响应**：200 成功时返回一个 JSON 数据（schema 为空，说明具体数据结构没有详细定义）。

### 2.2 项目相关接口 `/api/projects`

#### 获取项目列表

```json
"/api/projects": {
  "get": {
    "summary": "Get Projects",
    "operationId": "get_projects_api_projects_get",
    "responses": {
      "200": {
        "description": "Successful Response",
        "content": {
          "application/json": {
            "schema": {
              "title": "Response Get Projects Api Projects Get",
              "type": "array",
              "items": {"$ref": "#/components/schemas/Project"}
            }
          }
        }
      }
    }
  }
}
```

- **功能**：通过 GET 请求获取所有项目。  
- **返回**：返回一个数组，每个元素都是一个 Project 对象（定义在 components/schemas 里）。

#### 获取单个项目

```json
"/api/projects/{project_id}": {
  "get": {
    "summary": "Get Project",
    "operationId": "get_project_api_projects__project_id__get",
    "parameters": [{
      "required": true,
      "schema": {"title": "Project Id", "type": "integer"},
      "name": "project_id",
      "in": "path"
    }],
    "responses": {
      "200": {
        "description": "Successful Response",
        "content": {
          "application/json": {"schema": {"$ref": "#/components/schemas/Project"}}
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {"schema": {"$ref": "#/components/schemas/HTTPValidationError"}}
        }
      }
    }
  }
}
```

- **功能**：获取指定 `project_id` 的项目详情。  
- **参数**：`project_id` 为路径参数，必须为整数。  
- **响应**：返回一个 Project 对象；如果参数验证失败，则返回 422 错误，并附带验证错误信息。

### 2.3 其他接口

类似地，文档中还定义了以下接口：

- **事件接口 `/api/events` 和 `/api/events/{event_id}`**  
  - GET 请求获取所有事件列表或单个事件详情，返回的数据结构为 Event 对象或数组。

- **成员接口 `/api/members` 和 `/api/members/{member_id}`**  
  - GET 请求获取成员列表或单个成员信息，返回的是 Member 对象或数组。

- **设备接口 `/api/equipment` 和 `/api/equipment/{equipment_id}`**  
  - GET 请求获取设备列表或单个设备信息，返回的数据结构为 Equipment 对象。

- **测试项目生成接口 `/api/test/generate-project`**  
  - POST 请求，用于生成测试项目，返回成功响应后包含 JSON 数据（具体结构未详细定义）。

---

## 3. 组件（Components）及数据模型

文档的 **components/schemas** 部分定义了各种数据模型，这里列举几个主要模型：

### 3.1 Equipment 模型

```json
"Equipment": {
  "title": "Equipment",
  "required": ["id", "name", "type", "status", "location", "last_maintenance", "next_maintenance", "responsible_member"],
  "type": "object",
  "properties": {
    "id": {"title": "Id", "type": "integer"},
    "name": {"title": "Name", "type": "string"},
    "type": {"title": "Type", "type": "string"},
    "status": {"title": "Status", "type": "string"},
    "location": {"title": "Location", "type": "string"},
    "last_maintenance": {"title": "Last Maintenance", "type": "string"},
    "next_maintenance": {"title": "Next Maintenance", "type": "string"},
    "responsible_member": {"title": "Responsible Member", "type": "string"}
  }
}
```

- **说明**：描述设备信息，必须包含设备的 id、名称、类型、状态、位置、最后和下一次维护时间，以及负责的成员信息。

### 3.2 Event 模型

```json
"Event": {
  "title": "Event",
  "required": ["id","title","type","date","location","description","capacity","registered","status","organizer","requirements","materials"],
  "type": "object",
  "properties": {
    "id": {"title": "Id", "type": "integer"},
    "title": {"title": "Title", "type": "string"},
    "type": {"title": "Type", "type": "string"},
    "date": {"title": "Date", "type": "string"},
    "location": {"title": "Location", "type": "string"},
    "description": {"title": "Description", "type": "string"},
    "capacity": {"title": "Capacity", "type": "integer"},
    "registered": {"title": "Registered", "type": "integer"},
    "status": {"title": "Status", "type": "string"},
    "organizer": {"title": "Organizer", "type": "string"},
    "requirements": {"title": "Requirements", "type": "array", "items": {"type": "string"}},
    "materials": {"title": "Materials", "type": "array", "items": {"type": "string"}}
  }
}
```

- **说明**：描述事件信息，包含事件的基本属性（标题、类型、日期、地点、描述等）以及参加人数、状态、主办方和所需材料等。

### 3.3 Member 模型

```json
"Member": {
  "title": "Member",
  "required": ["id","name","role","skills","join_date","projects"],
  "type": "object",
  "properties": {
    "id": {"title": "Id", "type": "integer"},
    "name": {"title": "Name", "type": "string"},
    "role": {"title": "Role", "type": "string"},
    "skills": {"title": "Skills", "type": "array", "items": {"type": "string"}},
    "join_date": {"title": "Join Date", "type": "string"},
    "projects": {"title": "Projects", "type": "array", "items": {"type": "integer"}}
  }
}
```

- **说明**：描述成员信息，包括成员的 id、姓名、角色、技能、加入日期和参与项目的列表。

### 3.4 Project 模型

```json
"Project": {
  "title": "Project",
  "required": ["id","name","description","status","leader","members","tech_stack","progress","start_date","deadline","budget","equipment","achievements"],
  "type": "object",
  "properties": {
    "id": {"title": "Id", "type": "integer"},
    "name": {"title": "Name", "type": "string"},
    "description": {"title": "Description", "type": "string"},
    "status": {"title": "Status", "type": "string"},
    "leader": {"title": "Leader", "type": "string"},
    "members": {"title": "Members", "type": "array", "items": {"type": "string"}},
    "tech_stack": {"title": "Tech Stack", "type": "array", "items": {"type": "string"}},
    "progress": {"title": "Progress", "type": "integer"},
    "start_date": {"title": "Start Date", "type": "string"},
    "deadline": {"title": "Deadline", "type": "string"},
    "budget": {"title": "Budget", "type": "number"},
    "equipment": {"title": "Equipment", "type": "array", "items": {"type": "string"}},
    "achievements": {"title": "Achievements", "type": "array", "items": {"type": "string"}}
  }
}
```

- **说明**：描述项目的信息，包含项目的基本描述、状态、负责人、成员列表、技术栈、进度、起始与截止日期、预算、使用的设备以及取得的成果。

### 3.5 HTTPValidationError 与 ValidationError 模型

- **HTTPValidationError**：用于描述验证错误时返回的格式，通常包含一个 `detail` 字段，其中每一项都是一个 `ValidationError`。  
- **ValidationError**：描述单个验证错误，包括错误所在的位置（loc）、错误信息（msg）和错误类型（type）。

---

