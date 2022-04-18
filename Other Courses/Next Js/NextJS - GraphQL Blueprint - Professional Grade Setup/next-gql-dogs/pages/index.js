import { getDogs, queryClient } from "../src/api";
import { dehydrate, useQuery } from "react-query";
import { Card, Grid, Text, Title, Image } from "@mantine/core";
import Link from "next/link";

export async function getServerSideProps() {
  await queryClient.prefetchQuery("dogs", () => getDogs());

  return {
    props: { dehydratedState: dehydrate(queryClient) }
  };
}

export default function Home() {
  const { data } = useQuery(["dogs"], () => getDogs());
  return (
    <div>
      <Grid>
        {data?.dogs.map((f, i) => (
          <Grid.Col xs={12} md={6} lg={4} key={[f.name, i].join(":")} p={5}>
            <Link href={`/dog/${f.name}`} passHref>
              <Card>
                <Card.Section>
                  <Image height={350} src={f.image} alt="green iguana" />
                </Card.Section>
                <Title order={3}>{f.name}</Title>
                <Text>
                  {f.weight} pound {f.ageInWeeks} weeks old{" "}
                  {f.sex.toLowerCase()} {f.breed.toLowerCase()}
                </Text>
              </Card>
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
