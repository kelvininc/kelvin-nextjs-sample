# kelvin-nextjs-sample

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). It is intended to showcase how to use the [Kelvin JavaScript SDK](https://www.npmjs.com/package/@kelvininc/web-client-sdk) within a Next.js app. 

## Getting Started

1. Create your `.env` file from the `.env.example` file provided
2. Run `nvm use` to ensure you are using the correct Node.js version
3. Run `npm install`
4. Run `npm run dev` to start the development server:
5. Open [http://localhost:4200](http://localhost:4200) with your browser to see the result.

## Docker Image

A Docker image is provided with the project to facilitate its deployment.

#### Build the Image

To build the image, run the following:

```
# Build the image
docker build --tag kelvin-nextjs-sample .
```

#### Run the Image as a Container

```
docker run -p 4200:4200  kelvin-nextjs-sample
```

## Learn More

To learn more about Kelvin, see the following resources:

- [Kelvin Platform Documentation](https://docs.kelvininc.com/) - on this page you will learn about the Kelvin Collaborative Control Software, how it is structured and the functions of the different components making up the whole technology stack.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
