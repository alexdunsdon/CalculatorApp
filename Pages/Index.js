import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [storeDomain, setStoreDomain] = useState('')
  const [results, setResults] = useState(null)

  async function fetchStoreData() {
    // Implement your API call here
    const apiKey = '7906e457-a0f7-469c-521a-f572d059' // Replace with your actual API key
    const apiUrl = `https://api.storeleads.app/v1/stores/${storeDomain}`

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch store data')
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
      setResults({ error: error.message })
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Store Profit Calculator</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <main>
        <div className={styles.calculator}>
          <input
            type="text"
            value={storeDomain}
            onChange={(e) => setStoreDomain(e.target.value)}
            placeholder="Enter store domain"
            className={styles.input}
          />
          <button onClick={fetchStoreData} className={styles.button}>Fetch Store Data</button>
          {results && (
            <div className={styles.results}>
              {results.error ? (
                <p>Error: {results.error}</p>
              ) : (
                <>
                  <p>Annual Revenue: ${results.annual_revenue}</p>
                  <p>Product Category: {results.product_category}</p>
                  <p>Estimated profit with Order Legend: ${results.annual_revenue * 0.1}</p>
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
