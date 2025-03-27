import React, { Component } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native'
import { AppTheme, useAppTheme } from '@/theme/theme'
import { useUser } from '@clerk/clerk-expo'
import { ThemedText } from '@/components/ThemedText'
import { Avatar } from 'react-native-paper'
import { useRouter } from 'expo-router'
import PageHeader from '@/components/PageHeader'
const width = Dimensions.get('window').width

const AllImagesListScreen = () => {
  const theme = useAppTheme()
  const router = useRouter()

  const { user } = useUser()

  const styles = getStyles(theme)

  return (
    <View style={styles.container}>
      <ScrollView>
        <PageHeader />
        <View style={styles.modelsSection}>
          {/* <View style={styles.welcomeText}>
            <ThemedText type="default" style={{ fontSize: 18 }}>
              Models
            </ThemedText>
          </View> */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
          >
            <View style={styles.modelsContainer}>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginRight: theme.spacing.sm * 1.5,
                    flexDirection: 'column'
                  }}
                >
                  <View style={index === 0 ? styles.modelSelected : {}}>
                    <Avatar.Image
                      source={{
                        uri: 'https://via.placeholder.com/150'
                      }}
                      size={70}
                    />
                  </View>
                  <ThemedText style={styles.modelName} type="default">
                    Name
                  </ThemedText>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.body}>
          {[1, 2, 4].map((item, index) => (
            <View style={{ flexDirection: 'column' }} key={index}>
              <ThemedText
                style={{
                  marginBottom: theme.spacing.md,
                  color: theme.colors.textLight,
                  fontSize: theme.fonts.titleMedium.fontSize,
                  fontWeight: theme.fonts.titleMedium.fontWeight
                }}
                type="default"
              >
                25 March, 2024
              </ThemedText>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start'
                }}
              >
                {[1, 2, 3].map((item, index) => (
                  <View
                    key={index}
                    style={{
                      height: 150,
                      width: width / 2 - 30,
                      marginBottom: theme.spacing.md,
                      marginLeft: theme.spacing.sm + 2
                    }}
                  >
                    <Image
                      source={{
                        uri: 'https://t3.ftcdn.net/jpg/02/22/85/16/360_F_222851624_jfoMGbJxwRi5AWGdPgXKSABMnzCQo9RN.jpg'
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                        overflow: 'hidden'
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 10 }}></View>
      </ScrollView>
    </View>
  )
}

export default AllImagesListScreen

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
    welcomeText: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    modelsSection: { flexDirection: 'column', marginLeft: theme.spacing.md },
    modelsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
      // marginLeft: theme.spacing.sm,
      justifyContent: 'space-between',
      marginTop: theme.spacing.sm
    },
    modelName: {
      textAlign: 'center',
      color: theme.colors.textLight,
      fontSize: theme.fonts.titleSmall.fontSize,
      fontWeight: theme.fonts.titleSmall.fontWeight
    },
    modelSelected: {
      borderWidth: 2,
      borderColor: theme.colors.tertiary,
      borderRadius: 50,
      padding: 5,
      overflow: 'hidden'
    }
  })
