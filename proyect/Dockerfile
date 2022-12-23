#Install Dependencies only when needed
FROM node:alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /project
COPY package.json  yarn.lock ./
RUN yarn install --frozen-lockefile 

#Rebuild the source code only when needed
FROM node:alpine AS builder
WORKDIR /project
COPY . .
COPY --from=deps /project/node_modules ./node_modules
RUN yarn run build

#Production image , copy all the files and run next
FROM node:alpine AS runner
WORKDIR /project

ENV NODE_ENV production

COPY --from=builder /project/public ./public 
COPY --from=builder /project/.next ./.next
COPY --from=builder /project/node_modules ./node_modules
COPY --from=builder /project/package.json ./package.json

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /project/.next
USER nextjs

EXPOSE 3000

CMD ["yarn","start"]


