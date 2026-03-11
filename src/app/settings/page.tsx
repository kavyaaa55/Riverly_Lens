"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Bell, User, CreditCard, Trash2 } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    realtime: true,
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and tracking settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@company.com" />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Tech Innovations Inc." />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="technology">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get weekly competitor analysis reports</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notifications.weekly}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, weekly: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="realtime-alerts">Real-time Alerts</Label>
                    <p className="text-sm text-muted-foreground">Instant notifications for competitor activities</p>
                  </div>
                  <Switch
                    id="realtime-alerts"
                    checked={notifications.realtime}
                    onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, realtime: checked }))}
                  />
                </div>
                <Button>Save Preferences</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tracked Companies</CardTitle>
                  <CardDescription>Manage the companies you&apos;re monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Starbucks", "Nike", "Zara"].map((company) => (
                      <div key={company} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">{company[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium">{company}</p>
                            <p className="text-sm text-muted-foreground">Active tracking</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Active</Badge>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">Add New Company</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tracking Preferences</CardTitle>
                  <CardDescription>Configure what data to track for each company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch id="social-media" defaultChecked />
                      <Label htmlFor="social-media">Social Media</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="news-mentions" defaultChecked />
                      <Label htmlFor="news-mentions">News Mentions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="product-updates" defaultChecked />
                      <Label htmlFor="product-updates">Product Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="financial-data" />
                      <Label htmlFor="financial-data">Financial Data</Label>
                    </div>
                  </div>
                  <Button>Save Tracking Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Current Plan
                  </CardTitle>
                  <CardDescription>Manage your subscription and billing information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Professional Plan</h3>
                      <p className="text-sm text-muted-foreground">Track up to 10 companies</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">$49/month</p>
                      <p className="text-sm text-muted-foreground">Billed monthly</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button>Upgrade Plan</Button>
                    <Button variant="outline">Change Billing</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Statistics</CardTitle>
                  <CardDescription>Your current usage for this billing period</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Companies Tracked</span>
                      <span>3 / 10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Calls</span>
                      <span>1,247 / 10,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reports Generated</span>
                      <span>12 / 50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


