/**
 * JsonLd — emits structured data for the current route.
 *
 * Rendered on the server into the initial HTML so crawlers see the graph
 * without executing JavaScript. The payload is serialised with `<` escaped,
 * which closes the `</script>` breakout that raw JSON.stringify would allow.
 */
export default function JsonLd({ schema }) {
  const graph = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {graph.filter(Boolean).map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  )
}
