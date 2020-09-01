import { Resolver, Query, Ctx, Arg, Int, Mutation } from 'type-graphql';
import { Post } from '../entities/Post';
import { MyContext } from '../types';

@Resolver()
export class PostResolver {
  //获取列表
  @Query(()=> [Post])
  posts(@Ctx() ctx: MyContext): Promise<Post[]> {
    return ctx.em.find(Post, {})
  }
  //查询
  @Query(()=> Post, {nullable: true})
  post(
    @Arg('id', () => Int) id: number,
    @Ctx() ctx: MyContext
  ): Promise<Post|null> {
    return ctx.em.findOne(Post, { id })
  }
  //创建
  @Mutation(()=> Post)
  async createPost(
    @Arg('title') title: string,
    @Ctx() ctx: MyContext
  ): Promise<Post> {
    const post = ctx.em.create(Post, {title});
    await ctx.em.persistAndFlush(post);
    return post
  }
  //修改
  @Mutation(()=> Post, { nullable: true })
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
    @Ctx() ctx: MyContext
  ): Promise<Post|null> {
    const post = await ctx.em.findOne(Post, {id});
    if(!post) {
      return null
    }
    if(typeof title !== 'undefined') {
      post.title = title;
      await ctx.em.persistAndFlush(post);
    }
    return post
  }
  //删除
  @Mutation(()=> Boolean)
  async deletePost(
    @Arg('id') id: number,
    @Ctx() ctx: MyContext
  ): Promise<boolean> {
    await ctx.em.nativeDelete(Post, {id});
    return true;  
  }
}