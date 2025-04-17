import { View, StyleSheet, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '@/context/GlobalContext'
import { Card, Text, Button, Surface, useTheme } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { ThemedText } from '@/components/ThemedText'
import PageHeader from '@/components/PageHeader'
import { LinearGradient } from 'expo-linear-gradient'
import CustomButton from '@/components/ui/Button'
import { IPayAsYouGo, IPaugPackageResponse } from '@/types/paug.types'
import { useApi } from '@/hooks/useApi'
import { ApiResponse } from '@/types/apiResp.types'

const CoinPackage = ({
  coins,
  bonusCoins,
  description,
  price,
  currency,
  isPopular = false
}: {
  coins: number
  description: string
  bonusCoins: number
  price: number
  currency: string
  isPopular?: boolean
}) => {
  const theme = useAppTheme()
  const styles = getStyles(theme)
  return (
    <Surface
      style={[
        styles.packageContainer,
        isPopular && { borderColor: theme.colors.primary, borderWidth: 2 }
      ]}
      elevation={2}
    >
      {isPopular && (
        <View
          style={{
            position: 'absolute',
            top: -19,
            left: 20,
            backgroundColor: theme.colors.primary,
            borderRadius: 50,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.xs
          }}
        >
          <ThemedText
            type="default"
            style={{
              color: '#fff',
              fontSize: theme.fonts.labelMedium.fontSize,
              fontWeight: theme.fonts.labelMedium.fontWeight
            }}
          >
            Popular
          </ThemedText>
        </View>
      )}

      <View style={{ flex: 0.8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text variant="titleLarge" style={styles.coinText}>
            {coins} Coins
          </Text>
          <Text variant="labelSmall" style={styles.descriptionText}>
            + {bonusCoins} Bonus Coins
          </Text>
        </View>
        <Text variant="bodyMedium" style={styles.descriptionText}>
          {description}
        </Text>
      </View>
      <CustomButton
        text={`${currency.toUpperCase()} ${price} `}
        style={{ flex: 0.2 }}
        onPress={() => { }}
        loading={false}
        disable={false}
      />
    </Surface>
  )
}

const CoinsScreen = () => {
  const { user } = useGlobalContext()
  const theme = useAppTheme()
  const api = useApi()
  const styles = getStyles(theme)
  const { location } = useGlobalContext()
  const [paugPackages, setPaugPackages] = useState<IPayAsYouGo[]>([])

  useEffect(() => {
    const fetchPaugPackages = async () => {
      const countryCode = location?.locales[0].regionCode || 'US'
      const currencyCode = location?.locales[0].currencyCode || 'USD'
      const packages = await api.get<ApiResponse<IPaugPackageResponse>>(api.routes.SUBSCRIPTION.GET_PAUG_PACKAGES(countryCode, currencyCode))
      if (packages.status === 200) {
        setPaugPackages(packages.data.data?.paugs || [])
      }
    }
    fetchPaugPackages()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
        <PageHeader pageTitle="Coin Store" />
        <View style={styles.body}>
          {/* Current Balance Card */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#6366f1', '#9333ea']}
            style={styles.balanceCard}
          >
            <Card.Content>
              <ThemedText type="default" style={styles.cardMainTitle}>
                Current Balance
              </ThemedText>
              <View style={styles.balanceRow}>
                {/* <MaterialCommunityIcons name="plus" size={24} color="white" /> */}
                <Image
                  source={require('@/assets/images/coin.png')}
                  style={{ width: 38, height: 38 }}
                />
                <ThemedText type="default" style={styles.cardCostText}>
                  {user?.coins || 0}
                </ThemedText>
              </View>
              <ThemedText type="default" style={styles.cardSubTitle}>
                Each photo generation costs 5 coins
              </ThemedText>
            </Card.Content>
          </LinearGradient>

          {/* Package Selection */}
          <ThemedText type="default" style={styles.sectionTitle}>
            Select Package
          </ThemedText>

          {paugPackages.map((paug) => (
            <CoinPackage
              key={paug.id}
              coins={paug.coinAllowance}
              bonusCoins={paug.bonusCoins}
              description={paug.description}
              price={paug.prices[0].price}
              currency={paug.prices[0].currency}
              isPopular={paug.isPopular}
            />
          ))}


        </View>
      </ScrollView>
    </View>
  )
}

const getStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background
    },
    body: {
      flex: 1,
      padding: theme.spacing.md
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4
    },

    balanceCard: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.md,
      marginBottom: theme.spacing.xxl,
      borderRadius: theme.roundness * 3
    },
    balanceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16
    },
    cardMainTitle: {
      fontSize: theme.fonts.titleLarge.fontSize,
      fontWeight: theme.fonts.titleLarge.fontWeight,
      color: theme.colors.background
    },
    cardSubTitle: {
      fontSize: theme.fonts.labelSmall.fontSize,
      fontWeight: theme.fonts.labelSmall.fontWeight,
      color: theme.colors.background
    },
    cardCostText: {
      marginLeft: theme.spacing.md,
      fontSize: theme.fonts.titleLarge.fontSize,
      fontWeight: theme.fonts.titleLarge.fontWeight,
      color: theme.colors.background
    },
    sectionTitle: {
      marginBottom: theme.spacing.md,
      fontSize: theme.fonts.titleMedium.fontSize,
      fontWeight: theme.fonts.titleMedium.fontWeight,
      color: theme.colors.text
    },
    packageContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.md,
      borderRadius: theme.roundness * 3,
      marginBottom: theme.spacing.xl,
      backgroundColor: theme.colors.inverseOnSurface
    },
    coinText: {
      fontSize: theme.fonts.headlineSmall.fontSize,
      fontWeight: theme.fonts.headlineSmall.fontWeight,
      color: theme.colors.text
    },
    descriptionText: {
      marginTop: theme.spacing.xs,
      fontSize: theme.fonts.labelMedium.fontSize,
      fontWeight: theme.fonts.labelMedium.fontWeight,
      color: theme.colors.text
    },
    priceButton: {
      minWidth: 100
    },
    generateButton: {
      margin: 16,
      borderRadius: 12
    },
    generateButtonContent: {
      paddingVertical: 8
    }
  })

export default CoinsScreen
