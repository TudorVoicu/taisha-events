import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, MessageCircle, Facebook, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';


const ContactPage = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(6, { message: "Phone number is required" }),
    service: z.string().optional(),
    message: z.string().min(10, { message: "Message is too short" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const result = await emailjs.send(
        'zoho_taisha_smtp',
        'template_2x6ikqs',
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.service,
          message: data.message,
        },
        'dL93QDuUB_gKPv1fR'
      );

      toast({
        title: "Message sent",
        description: "Thank you for your message! We will contact you shortly.",
      });
      form.reset();

      console.log(result.text);
    } catch (error) {
      console.error('Email send error:', error);
      toast({
        title: "Failed to send",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };


  return (
    <section className="min-h-screen py-28 bg-black">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">{t("contact.title")}</h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-light-gray max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-dark-gray p-8 rounded-lg mb-8">
              <h3 className="font-playfair text-2xl font-semibold text-gold mb-6">{t("contact.getInTouch")}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">{t("contact.location.title")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t("contact.phone.title")}</h4>
                    <p className="text-light-gray">{t("contact.phone.number")}</p>
                    <p className="text-light-gray text-sm">{t("contact.phone.hours")}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t("contact.email.title")}</h4>
                    <p className="text-light-gray">{t("contact.email.info")}</p>
                  </div>
                </div>
                
                {/* <div className="flex items-start gap-4">
                  <div className="text-gold mt-1">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{t("contact.hours.title")}</h4>
                    <p className="text-light-gray">{t("contact.hours.weekdays")}</p>
                    <p className="text-light-gray">{t("contact.hours.weekend")}</p>
                  </div>
                </div> */}
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-6">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-white hover:bg-gold transition-colors duration-300" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-white hover:bg-gold transition-colors duration-300" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-purple flex items-center justify-center text-white hover:bg-gold transition-colors duration-300" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-dark-gray p-8 rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-playfair text-2xl font-semibold text-gold mb-6">{t("contact.form.title")}</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">{t("contact.form.name")}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="w-full bg-black border border-dark-purple rounded-sm px-4 py-6 text-white focus:border-gold focus:outline-none transition-colors" 
                          />
                        </FormControl>
                        <FormMessage className="text-white italic" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-sm">{t("contact.form.email")}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field}
                            type="email"
                            className="w-full bg-black border border-dark-purple rounded-sm px-4 py-6 text-white focus:border-gold focus:outline-none transition-colors" 
                          />
                        </FormControl>
                        <FormMessage className="text-white italic" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm">{t("contact.form.phone")}</FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          type="tel"
                          className="w-full bg-black border border-dark-purple rounded-sm px-4 py-6 text-white focus:border-gold focus:outline-none transition-colors" 
                        />
                      </FormControl>
                      <FormMessage className="text-white italic" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm">{t("contact.form.interest")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full bg-black border border-dark-purple rounded-sm px-4 py-6 text-white focus:border-gold focus:outline-none transition-colors">
                            <SelectValue placeholder={t("contact.form.selectService")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-black border border-dark-purple text-white">
                          <SelectItem value="event">{t("contact.form.services.event")}</SelectItem>
                          <SelectItem value="private">{t("contact.form.services.private")}</SelectItem>
                          <SelectItem value="vip">{t("contact.form.services.vip")}</SelectItem>
                          <SelectItem value="corporate">{t("contact.form.services.corporate")}</SelectItem>
                          <SelectItem value="flavors">{t("contact.form.services.flavors")}</SelectItem>
                          <SelectItem value="equipment">{t("contact.form.services.equipment")}</SelectItem>
                          <SelectItem value="other">{t("contact.form.services.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-white italic" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-sm">{t("contact.form.message")}</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field}
                          rows={4}
                          className="w-full bg-black border border-dark-purple rounded-sm px-4 py-3 text-white focus:border-gold focus:outline-none transition-colors resize-none" 
                        />
                      </FormControl>
                      <FormMessage className="text-white italic" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-dark-purple hover:bg-opacity-80 text-white py-6 rounded-sm transition-colors duration-300 border border-gold"
                >
                  {t("contact.form.send")}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
