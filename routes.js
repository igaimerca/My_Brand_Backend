import express from "express";
import adminAuth from "./middlewares/admin.auth.js";
import userAuth from "./middlewares/user.auth.js";

import upload from "./services/image.service.js";

const router = express.Router();

//controllers
import {
  createMessage,
  deleteMessage,
  message,
  messages,
  reply,
} from "./controllers/messages.controllers.js";

import {
  createBlog,
  blog,
  blogs,
  deleteBlog,
  updateBlog,
  commentBlog,
  likeBlog,
} from "./controllers/blogs.controllers.js";

import {
  createWork,
  work,
  works,
  updateWork,
  deleteWork,
} from "./controllers/work.controllers.js";

import {
  createExperience,
  experience,
  experiences,
  updateExperience,
  deleteExperience,
} from "./controllers/experience.controllers.js";

import {
  createSkill,
  deleteSkill,
  skills,
  updateSkill,
} from "./controllers/skills.controllers.js";

import {
  createAbout,
  about,
  updateAbout,
  updateImage,
} from "./controllers/about.controllers.js";

import { login, signup } from "./controllers/users.controllers.js";

//messages
router.get("/message", adminAuth, messages);
router.get("/message/:id", adminAuth, message);
router.post("/message/reply", adminAuth, reply);
router.post("/message/add", createMessage);
router.delete("/message/:id", adminAuth, deleteMessage);

//messages documentation
/**
 * @swagger
 *  components:
 *    schemas:
 *      Message:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          sender:
 *            type: string
 *          email:
 *            type: string
 *          message:
 *            type: string
 *          replied:
 *            type: boolean
 *          createAt:
 *            type: Date
 */

/**
 * @swagger
 * tags:
 *  name: Messages
 *  description: Api to manage messages
 */

/**
 * @swagger
 * paths:
 *  /message:
 *    get:
 *      summary: get all messages
 *      tags: [Messages]
 *      responses:
 *        "200":
 *          description: all messages
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Message"
 *  /message/{id}:
 *    get:
 *      summary: get a specific message
 *      tags: [Messages]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: message id
 *      responses:
 *        "200":
 *          description: a amessage
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Message"
 *    delete:
 *      summary: delete a message
 *      tags: [Messages]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: message id
 *      responses:
 *        "200":
 *          description: message deleted
 *  /message/reply:
 *    post:
 *      summary: reply to a message
 *      tags: [Messages]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                reply:
 *                  type: string
 *      responses:
 *        "200":
 *          description: reply sent
 *  /message/add:
 *    post:
 *      summary: send a message
 *      tags: [Messages]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                names:
 *                  type: string
 *                email:
 *                  type: string
 *                message:
 *                  type: string
 *      responses:
 *        "200":
 *          description: message sent
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Message"
 */

//blogs
router.get("/blog", blogs);
router.get("/blog/:id", blog);
router.put("/blog/:id", adminAuth, updateBlog);
router.put("/blog/like/:id", userAuth, likeBlog);
router.delete("/blog/:id", adminAuth, deleteBlog);
router.put("/blog/comment/:id", userAuth, commentBlog);
router.post("/blog/create", adminAuth, upload.single("picture"), createBlog);

//blogs documentation
/**
 * @swagger
 *  components:
 *    schemas:
 *      Blog:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          file:
 *            type: string
 *          image:
 *            type: string
 *          title:
 *            type: string
 *          likes:
 *            type: array
 *            items:
 *              type: string
 *          comments:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                user:
 *                  type: string
 *                comment:
 *                  type: string
 *                addedAt:
 *                  type: Date
 *          createdAt:
 *            type: Date
 */

/**
 * @swagger
 * tags:
 *  name: Blogs
 *  description: apis to manage blogs
 */

/**
 * @swagger
 * paths:
 *  /blog:
 *    get:
 *      summary: get all blogs
 *      tags: [Blogs]
 *      responses:
 *        "200":
 *          description: all blogs
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Blog"
 *  /blog/{id}:
 *    get:
 *      summary: get a specific blog
 *      tags: [Blogs]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: blog id
 *      responses:
 *        "200":
 *          description: a blog
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Blog"
 *    put:
 *      summary: update a specific blog
 *      tags: [Blogs]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: blog id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *      responses:
 *        "200":
 *          description: a blog
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Blog"
 *    delete:
 *      summary: delete a blog
 *      tags: [Blogs]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: blog id
 *      responses:
 *        "200":
 *          description: blog deleted
 *  /blog/like/{id}:
 *    put:
 *      summary: like a blog
 *      tags: [Blogs]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: blog id
 *      responses:
 *        "200":
 *          description: blog liked
 *  /blog/comment:
 *    put:
 *      summary: commment on a blog
 *      tags: [Blogs]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: blog id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                comment:
 *                  type: string
 *      responses:
 *        "200":
 *          description: blog liked
 *  /blog/create:
 *    post:
 *      summary: create a blog
 *      tags: [Blogs]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *      responses:
 *        "200":
 *          description: blog created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Blog"
 */

//works
router.get("/work", works);
router.get("/work/:id", adminAuth, work);
router.put("/work/:id", adminAuth, updateWork);
router.delete("/work/:id", adminAuth, deleteWork);
router.post("/work/create", adminAuth, upload.single("picture"), createWork);

//works documentation
/**
 * @swagger
 *  components:
 *    schemas:
 *      Work:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          title:
 *            type: string
 *          link:
 *            type: string
 *          description:
 *            type: string
 *          image:
 *            type: string
 *          cards:
 *            type: array
 *            items:
 *              type: string
 *          createdAt:
 *            type: Date
 */

/**
 * @swagger
 * tags:
 *  name: Works
 *  description: apis to manage works
 */

/**
 * @swagger
 * paths:
 *  /work:
 *    get:
 *      summary: Returns all works
 *      tags: [Works]
 *      responses:
 *        "200":
 *          description: blog created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Work"
 *  /work/{id}:
 *    get:
 *      summary: get a specific work
 *      tags: [Works]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: work id
 *      responses:
 *        "200":
 *          description: a work
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Work"
 *    put:
 *      summary: update a specific work
 *      tags: [Works]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: work id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                link:
 *                  type: string
 *                description:
 *                  type: string
 *                cards:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        "200":
 *          description: work updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Work"
 *    delete:
 *      summary: delete a work
 *      tags: [Works]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: work id
 *      responses:
 *        "200":
 *          description: work deleted
 *  /work/create:
 *    post:
 *      summary: create a work
 *      tags: [Works]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                link:
 *                  type: string
 *                description:
 *                  type: string
 *                cards:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        "200":
 *          description: work created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Work"
 */

//experiences
router.get("/experience", experiences);
router.get("/experience/:id", adminAuth, experience);
router.put("/experience/:id", adminAuth, updateExperience);
router.delete("/experience/:id", adminAuth, deleteExperience);
router.post("/experience/create", adminAuth, createExperience);

//experiences documentation
/**
 * @swagger
 *  components:
 *    schemas:
 *      Experience:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          company:
 *            type: string
 *          role:
 *            type: string
 *          startDate:
 *            type: Date
 *          endDate:
 *            type: Date
 *          current:
 *            type: boolean
 *          content:
 *            type: string
 *          createdAt:
 *            type: Date
 */

/**
 * @swagger
 * tags:
 *  name: Experiences
 *  description: apis to manage experiences
 */

/**
 * @swagger
 * paths:
 *  /experience:
 *    get:
 *      summary: Returns all experiences
 *      tags: [Experiences]
 *      responses:
 *        "200":
 *          description: All experiences
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Experience"
 *  /experience/{id}:
 *    get:
 *      summary: get a specific experience
 *      tags: [Experiences]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: experience id
 *      responses:
 *        "200":
 *          description: an experience
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Experience"
 *    put:
 *      summary: update a specific experince
 *      tags: [Experiences]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: experince id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                company:
 *                  type: string
 *                role:
 *                  type: string
 *                startDate:
 *                  type: Date
 *                endDate:
 *                  type: Date
 *                current:
 *                    type: boolean
 *                content:
 *                    type: string
 *      responses:
 *        "200":
 *          description: experience updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Experience"
 *    delete:
 *      summary: delete an experience
 *      tags: [Experiences]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: experience id
 *      responses:
 *        "200":
 *          description: experience deleted
 *  /experience/create:
 *    post:
 *      summary: create an experience
 *      tags: [Experiences]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                company:
 *                  type: string
 *                role:
 *                  type: string
 *                startDate:
 *                  type: Date
 *                endDate:
 *                  type: Date
 *                current:
 *                    type: boolean
 *                content:
 *                    type: string
 *      responses:
 *        "200":
 *          description: experience created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Experience"
 */

//skills
router.get("/skill", skills);
router.put("/skill/:id", adminAuth, updateSkill);
router.delete("/skill:id", adminAuth, deleteSkill);
router.post("/skill/create", adminAuth, createSkill);

//skills documentation
/**
 * @swagger
 *  components:
 *    schemas:
 *      Skill:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          title:
 *            type: string
 *          banner:
 *            type: string
 *          skills:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                percent:
 *                  type: string
 */

/**
 * @swagger
 * tags:
 *  name: Skills
 *  description: apis to manage skills
 */

/**
 * @swagger
 * paths:
 *  /skill:
 *    get:
 *      summary: Returns all skills
 *      tags: [Skills]
 *      responses:
 *        "200":
 *          description: All skills
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Skill"
 *  /skill/{id}:
 *    put:
 *      summary: update a specific skill
 *      tags: [Skills]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: skill id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                banner:
 *                  type: string
 *                skills:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                      percentage:
 *                        type: number
 *      responses:
 *        "200":
 *          description: skill updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Skill"
 *    delete:
 *      summary: delete a skill
 *      tags: [Skills]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: skill id
 *      responses:
 *        "200":
 *          description: skill deleted
 *  /skill/create:
 *    post:
 *      summary: create a skill
 *      tags: [Skills]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                banner:
 *                  type: string
 *                skills:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                      percentage:
 *                        type: number
 *      responses:
 *        "200":
 *          description: skill created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Skill"
 */

//about
router.get("/about", about);
router.post("/about/create", adminAuth, createAbout);
router.put("/about/image/:id", adminAuth, updateImage);
router.put("/about/content/:id", adminAuth, updateAbout);

//about documentation
/**
 * @swagger
 *  components:
 *    schemas:
 *      About:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          file:
 *            type: string
 *          image:
 *            type: string
 */

/**
 * @swagger
 * tags:
 *  name: About
 *  description: apis to manage about me
 */

/**
 * @swagger
 * paths:
 *  /about:
 *    get:
 *      summary: Returns about me
 *      tags: [About]
 *      responses:
 *        "200":
 *          description: about me
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/About"
 *  /about/content/{id}:
 *    put:
 *      summary: update a content of the about
 *      tags: [About]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: about id
 *      responses:
 *        "200":
 *          description: about updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/About"
 *  /about/image/{id}:
 *    put:
 *      summary: update a image of the about
 *      tags: [About]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: interger
 *          required: true
 *          description: about id
 *      responses:
 *        "200":
 *          description: image updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/About"
 *  /about/create:
 *    post:
 *      summary: create about me
 *      tags: [About]
 *      responses:
 *        "200":
 *          description: about created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/About"
 */

//user
router.post("/user/login", login);
router.post("/user/signup", signup);

//user documentation
/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: string
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *          role:
 *            type: string
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: apis to manage users
 */

/**
 * @swagger
 * paths:
 *  /user/login:
 *    post:
 *      summary: user login
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        "200":
 *          description: user logged in
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *  /user/signup:
 *    post:
 *      summary: user signup
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                role:
 *                  type: string
 *      responses:
 *        "200":
 *          description: user signed up
 */

export default router;
